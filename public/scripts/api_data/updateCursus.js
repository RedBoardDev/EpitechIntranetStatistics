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
    XPHubApi.countXPValidated();
    const meXPHubVar = await XPHubApi.getMeVariable();
    updateXPHubInformation(meXPHubVar);
}

const roadBlockData = `
  {
    "Technical foundation": {
      "modules": [
        "B-CPE-100",
        "B-CPE-101",
        "B-CPE-110",
        "B-CPE-111",
        "B-CPE-200",
        "B-CPE-201",
        "B-CPP-300",
        "B-CCP-400",
        "B-CPP-500",
        "B-CPP-501",
        "B-CPP-510",
        "B-PSU-100",
        "B-PSU-101",
        "B-PSU-200",
        "B-PSU-210",
        "B-MET-100",
        "B-MET-200",
        "B-MET-400",
        "B-NWP-400",
        "B-YEP-400",
        "B-YEP-410",
        "B-OOP-400",
        "B-DEV-500",
        "B-DEV-501",
        "B-DEV-510",
        "B-FUN-500",
        "B-FUN-501",
        "B-FUN-510",
        "B-SYN-200",
        "B-SYN-400",
        "B-YEP-500",
        "B-PDG-300"
      ],
      "goal_tech1": 20,
      "goal_tech2": 13,
      "goal_tech3": 8
    },
    "Technical supplement": {
      "modules": [
        "B-MUL-100",
        "B-MUL-200",
        "B-MAT-100",
        "B-MAT-200",
        "B-MAT-400",
        "B-MAT-500",
        "B-AIA-200",
        "B-AIA-500",
        "B-SAD-200",
        "B-WEB-200",
        "B-NSA-100",
        "B-NSA-400",
        "B-NSA-500",
        "B-SHL-300",
        "B-FUN-300",
        "B-SHL-400",
        "B-ASM-400",
        "B-FUN-400",
        "B-PSU-402",
        "B-CNA-410",
        "B-DOP-200",
        "B-DOP-400",
        "B-DOP-500",
        "B-SEC-200",
        "B-SEC-400",
        "B-SEC-500",
        "B-SYN-200",
        "B-SYN-400",
        "B-PSU-400"
      ],
      "goal_tech1": 8,
      "goal_tech2": 6,
      "goal_tech3": 2
    },
    "HUB - Innovation": {
      "modules": [
        "G-JAM-001",
        "B-INN-000",
        "B-INN-010",
        "B-INN-200",
        "B-INN-400",
        "B-INN-500",
        "G-CUS-001",
        "G-CUS-002",
        "G-CUS-003",
        "G-CUS-004",
        "G-CUS-005",
        "G-CUS-006",
        "G-CUS-007",
        "G-CUS-008",
        "B-EIP-500",
        "B-MOO-500",
        "B-MOO-501",
        "B-MOO-502",
        "B-PRO-500",
        "G-EPI-010"
      ],
      "goal_tech1": 3,
      "goal_tech2": 4,
      "goal_tech3": 13
    },
    "Soft skills": {
      "modules": [
        "G-FRE-010",
        "B-PCP-000",
        "B-FRE-100",
        "B-FRE-200",
        "B-FRE-400",
        "B-FRE-501",
        "B-FLE-100",
        "B-FLE-200",
        "B-FLE-400",
        "B-FLE-500",
        "B-SPA-100",
        "B-PRO-120",
        "B-PRO-220",
        "B-PRO-420",
        "B-GER-001",
        "B-FRE-010",
        "B-PRO-100",
        "B-PRO-510",
        "B-PRO-400",
        "B-PMP-400",
        "B-PCP-400"
      ],
      "goal_tech1": 3,
      "goal_tech2": 3,
      "goal_tech3": 3
    }
  }
`;

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
                student_credits: nodeCompleteData?.['student_credits'] ?? '0',
                color: nodeCompleteData?.['color'] ?? null
            };
            return moduleInfo;
        }
    } catch (error) { }
    return false;
}

const getRoadBlockInformation = async (api) => {
    let roadBlocksList = [];
    const data = JSON.parse(roadBlockData);
    const types = Object.keys(data);
    const semestersCodeForActualYear = [0, 3, 4]; // TO DO automatically

    for (const type of types) {
        const modulesActualSemester = await Promise.all(data[type].modules.map(async codeInstance => {
            const semesterCodeMatch = codeInstance.match(/-(\d)/);
            if (semesterCodeMatch) {
                const semesterCode = semesterCodeMatch[1];
                if (semestersCodeForActualYear.indexOf(Number(semesterCode)) !== -1) {
                    const moduleInfo = await getModuleInformation(api, codeInstance, semesterCode);
                    if (moduleInfo !== null && moduleInfo !== undefined) {
                        return moduleInfo;
                    }
                }
            }
            return false;
        }));
        const filteredModules = modulesActualSemester.filter(module => module !== false);
        roadBlocksList.push({ type: type, modules: filteredModules });
    }
    updateRoadBlockInformation(roadBlocksList);
}

const updateTimelineProjet = async (api) => {
    let timeLineData = {};
    const generalCourse = await api.getGeneralCourseData();
    const regexSkip = /^(B0|[A-Z]0)|.*Hub.*|.*Roadblock.*|.*Administrative.*|.*Internship.*|.*Communication.*|.*Hackathon.*/;

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
};

export const updateAllCursusData = async (api, XPHubApi, generalNotesData) => {
    getXPHubData(api, XPHubApi, generalNotesData); // await here ?
    getRoadBlockInformation(api); // await here ?
    updateTimelineProjet(api); // await here ?
}
