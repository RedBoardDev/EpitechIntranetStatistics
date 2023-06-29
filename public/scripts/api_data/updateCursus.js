import { roadBlockData } from "./roadBlockData.js"
import { updateXPHubInformation, updateRoadBlockInformation, updateTimeLineData } from './updateInformation.js';

const getXPHubData = async (api, XPHubApi, generalNotesData) => {
    const location = api.getUserLocation();
    let pays = location[0];
    let region = location[1];

    let activitiesPublic = await api.getNodeOnCourseCompleteData({ code: "B-INN-000", codeinstance: `${pays}-0-1` });
    let activitiesCampus = await api.getNodeOnCourseCompleteData({ code: "B-INN-000", codeinstance: `${region}-0-1` });
    if (activitiesPublic === undefined) {
        activitiesPublic = null;
        activitiesPublic = (await api.getDataFromAPI(`/module/${api.getScolarYear()}/B-INN-000/${pays}-0-1/?format=json`));
        api.setNodeCourseCompleteData({ code: "B-INN-000", codeinstance: `${pays}-0-1` }, activitiesPublic);
    }
    if (activitiesCampus === undefined) {
        activitiesCampus = null;
        activitiesCampus = (await api.getDataFromAPI(`/module/${api.getScolarYear()}/B-INN-000/${region}-0-1/?format=json`));
        api.setNodeCourseCompleteData({ code: "B-INN-000", codeinstance: `${region}-0-1` }, activitiesCampus);
    }

    const everyActivities = (activitiesPublic.activites).concat(activitiesCampus.activites);
    everyActivities.map((activite) => {
        if (activite.type_title) {
            if (activite.type_title === "Project") {
                XPHubApi.addProject(generalNotesData['notes'], activite.codeacti, activite.begin, activite.end);
            } else {
                activite.events.map((event) => {
                    if (event.user_status) XPHubApi.addActivite(activite.title, activite.type_title, event.user_status, event.begin);
                    else if (event.assistants.find((assistant) => assistant.login === api.getUserEmail()))
                        XPHubApi.addActivite(activite.title, activite.type_title, 'organisateur', event.begin);
                    else if (event.already_register) XPHubApi.addActivite(activite.title, activite.type_title, 'soon', event.begin);
                });
            }
        }
    });
    XPHubApi.countXpSoon();
    const XPHub_me = await XPHubApi.getMeVariable();
    const XPHub_xpAct = await XPHubApi.getxpAct();
    updateXPHubInformation(XPHub_me, XPHub_xpAct);
}

async function getModuleInformation(api, codeInstance, codeSemester) { //check si on bien inscrit au module + roadblock + projet sinon mettre en gris dans le front
    try {
        let nodeCompleteData = await api.getNodeOnCourseCompleteData({ code: `${codeInstance}`, semester: Number(codeSemester) });
        if (nodeCompleteData === null) {
            return null;
        }
        if (nodeCompleteData === undefined) {
            const nodeInfo = await api.getNodeOnCourseData({ code: `${codeInstance}`, semester: Number(codeSemester) });
            nodeCompleteData = await api.getDataFromAPI(`module/${api.getScolarYear()}/${nodeInfo.code}/${nodeInfo.codeinstance}/?format=json`);
            api.setNodeCourseCompleteData({ code: codeInstance, semester: codeSemester }, nodeCompleteData);
        }
        if (!nodeCompleteData.error) {
            let moduleInfo = {
                name: `[${codeInstance}] ${nodeCompleteData?.['title'] ?? null}`,
                user_credits: nodeCompleteData?.['user_credits'] ?? null,
                credits: nodeCompleteData?.['credits'] ?? null,
                student_grade: nodeCompleteData?.['student_grade'] ?? null,
                student_credits: nodeCompleteData?.['student_credits'] ?? 0,
                color: nodeCompleteData?.['color'] ?? null
            };
            return moduleInfo;
        }
    } catch (error) { }
    return false;
}

const getRoadBlockInformation = async (api, XPHubApi) => {
    let roadBlocksList = [];
    const data = roadBlockData;
    const types = Object.keys(data);
    const studentYear = api.getStudentYear();

    for (const type of types) {
        const modulesActualSemester = await Promise.all(data[type].modules.map(async codeInstance => {
            const semesterCodeMatch = codeInstance.match(/-(\d)/);
            if (semesterCodeMatch) {
                const semesterCode = semesterCodeMatch[1];
                if (semesterCode) {
                    let moduleInfo = await getModuleInformation(api, codeInstance, semesterCode);
                    if (/B-INN-[0-9]00/.test(codeInstance)) {
                        if (moduleInfo === null || moduleInfo === undefined) {
                            return false;
                        }
                        moduleInfo.credits = (studentYear === 1) ? 5 : 8;
                        moduleInfo.user_credits = (studentYear === 1) ? 5 : 8;
                        moduleInfo.student_credits = Math.floor((XPHubApi.getnbXps() / 10));
                        if (moduleInfo.student_credits > moduleInfo.credits)
                        moduleInfo.student_credits = moduleInfo.credits;
                        if (moduleInfo.student_credits >= moduleInfo.credits)
                            moduleInfo.color = 'green';
                    }
                    if (moduleInfo !== null && moduleInfo !== undefined) {
                        return moduleInfo;
                    }
                }
            }
            return false;
        }));
        const filteredModules = modulesActualSemester.filter(module => module !== false);
        roadBlocksList.push({
            type: type,
            modules: filteredModules,
            total_roadblock_credits: filteredModules.reduce((sum, module) => {
                return sum + (module.credits || 0);
            }, 0),
            available_credits: filteredModules.reduce((sum, module) => {
                return sum + (parseInt(module.user_credits) || 0);
            }, 0),
            credit_needed: roadBlockData[type][`goal_tech${studentYear}`] || 0,
            actual_student_credits: filteredModules.reduce((sum, module) => {
                return sum + (module.student_credits || 0);
            }, 0)
        });

    }
    updateRoadBlockInformation(roadBlocksList);
}

const updateTimelineProjet = async (api) => {
    let timeLineData = {};
    const generalCourse = await api.getGeneralCourseData();
    const regexSkip = /^(B0|[A-Z]0)|.*Hub.*|.*Roadblock.*|.*Administrative.*|.*Internship.*|.*Hackathon.*/;
    for (let node of generalCourse) {
        if (node.status === "notregistered") {
            continue;
        }
        if (regexSkip.test(node.title)) {
            continue;
        }
        let nodeCompleteData;
        if (node.complete_data === undefined) {
            nodeCompleteData = await api.getDataFromAPI(`module/${api.getScolarYear()}/${node.code}/${node.codeinstance}/?format=json`);
            node.complete_data = nodeCompleteData;
        } else {
            nodeCompleteData = node.complete_data;
        }
        for (let activite of nodeCompleteData.activites) {
            if (activite.is_projet === true && activite.type_code === "proj" && (activite.type_title === "Mini-project" || activite.type_title === "Project")) {
                if (!timeLineData[node.title]) {
                    timeLineData[node.title] = [];
                }
                timeLineData[node.title].push({
                    title: activite.title,
                    begin: activite.begin,
                    end: activite.end,
                    end_register: activite.end_register
                });
            }
        }
    }
    updateTimeLineData(timeLineData);
    return timeLineData;
};

export const updateAllCursusData = async (api, XPHubApi, generalNotesData) => {
    await getXPHubData(api, XPHubApi, generalNotesData);
    getRoadBlockInformation(api, XPHubApi);
    return updateTimelineProjet(api);
}
