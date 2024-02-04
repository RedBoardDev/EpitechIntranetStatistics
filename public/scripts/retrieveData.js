import { getModuleInformation } from "./ModuleHandler.js";
import { getHighestTEpitech } from "./TEpitech.js";
import { creditPerStudentYear } from "./data/hubData.js";
import { modulesPerRoadBlock } from "./data/sortedModules.js";
import { updateFrontend } from "./updateFrontend.js";

function updateSideBarInformation(dataApi) {
    const generalUserData = dataApi.getGeneralUserData();
    if (!generalUserData) return;

    const data = {
        name: (generalUserData['title'] ?? ''),
        email: dataApi.getUserEmail(),
        cursus: (generalUserData['course_code'] ?? ''),
        semester: (generalUserData['semester_code'] ?? ''),
        promo: 'Promotion ' + (generalUserData['promo'] ?? ''),
        profilPicture: ("https://intra.epitech.eu" + (generalUserData['picture'] ?? '')),
        city: (generalUserData['groups'][0]?.['title'] ?? '')
    };

    updateFrontend('sidebar', data);
}

async function updateDashboardInformation(dataApi) {
    const generalUserData = dataApi.getGeneralUserData();
    if (!generalUserData) return;

    const data = {
        credits: (generalUserData['credits'] ?? 0),
        GPA: (generalUserData['gpa'][0]?.['gpa'] ?? 0.00),
        highestTEpitech: (getHighestTEpitech(dataApi))
    };
    updateFrontend('dashboard', data);
}

async function updateRoadBlockInformation(dataApi, XPHubApi) {
    const sortedModules = modulesPerRoadBlock;
    const roadBlockkeys = Object.keys(sortedModules);
    const studentYear = dataApi.getStudentYear();

    let roadBlocksList = [];

    for (const rdKey of roadBlockkeys) {
        const actualSemesterModules = await Promise.all(sortedModules[rdKey].modules.map(async codeInstance => {
            const semesterCodeMatch = codeInstance.match(/-(\d)/);
            if (!semesterCodeMatch || !semesterCodeMatch[1])
                return false;

            const semesterCode = semesterCodeMatch[1];
            let moduleInfo = await getModuleInformation(dataApi, codeInstance, semesterCode);
            if (moduleInfo === null || moduleInfo === undefined)
                return false;

            // hub module ?
            if (/B-INN-[0-9]00/.test(codeInstance)) {
                // moduleInfo.credits = (studentYear === 1) ? 5 : 8;
                moduleInfo.credits = creditPerStudentYear[studentYear] ?? 8;
                // moduleInfo.user_credits = (studentYear === 1) ? 5 : 8;
                moduleInfo.user_credits = creditPerStudentYear[studentYear] ?? 8;

                // moduleInfo.student_credits = Math.floor((XPHubApi.getnbXps() / 10));
                moduleInfo.student_credits = 3;
                if (moduleInfo.student_credits > moduleInfo.credits)
                    moduleInfo.student_credits = moduleInfo.credits;
                if (moduleInfo.student_credits >= moduleInfo.credits)
                    moduleInfo.color = 'green';
            }
            if (moduleInfo !== null && moduleInfo !== undefined)
                return moduleInfo;
            return false;
        }));

        const filteredModules = actualSemesterModules.filter(module => module !== false);

        roadBlocksList.push({
            type: rdKey,
            modules: filteredModules,
            total_roadblock_credits: filteredModules.reduce((sum, module) => {
                return sum + (module.credits || 0);
            }, 0),
            available_credits: filteredModules.reduce((sum, module) => {
                return sum + (parseInt(module.user_credits) || 0);
            }, 0),
            credit_needed: sortedModules[rdKey][`goal_tech${studentYear}`] || 0,
            actual_student_credits: filteredModules.reduce((sum, module) => {
                return sum + (module.student_credits || 0);
            }, 0)
        });
    }
    updateFrontend('roadblock', roadBlocksList);
}

const getXPHubData = async (api, XPHubApi) => {
    const generalNotesData = await api.getGeneralNotesData();

    const location = api.getUserLocation();
    let pays = location[0];
    let region = location[1];

    let activitiesPublic = await api.getNodeOnCourseCompleteData({ code: "B-INN-000", codeinstance: `${pays}-0-1` });
    let activitiesCampus = await api.getNodeOnCourseCompleteData({ code: "B-INN-000", codeinstance: `${region}-0-1` });
    if (activitiesPublic === undefined) {
        activitiesPublic = null;
        activitiesPublic = (await api.getCompleteDataFromApi("B-INN-000", `${pays}-0-1`));
        api.setNodeCourseCompleteData({ code: "B-INN-000", codeinstance: `${pays}-0-1` }, activitiesPublic);
    }
    if (activitiesCampus === undefined) {
        activitiesCampus = null;
        activitiesCampus = (await api.getCompleteDataFromApi("B-INN-000", `${region}-0-1`));
        api.setNodeCourseCompleteData({ code: "B-INN-000", codeinstance: `${region}-0-1` }, activitiesCampus);
    }
    const everyActivities = [
        ...(activitiesPublic?.activites || []),
        ...(activitiesCampus?.activites || [])
    ];
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
    let XPHub_xpAct = await XPHubApi.getxpAct();
    XPHub_xpAct.map((node) => {
        const types = node.alias;
        types.push(node.name);

        const activList = XPHub_me.activList;
        const activities = activList.filter((act) => types.includes(act.type));
        node['activities'] = activities;
    });
    const XPHub = {
        XP_Completed: XPHub_me.nbXps,
        XP_InProgress: XPHub_me.nbXpsSoon,
        XP_Lost: XPHub_me.nbXpsLost,
        XP_Activities: XPHub_xpAct,
    };
    updateFrontend('hub', XPHub);
}

async function retrieveData(XPHubApi, dataApi) {
    updateSideBarInformation(dataApi);
    updateDashboardInformation(dataApi);
    await getXPHubData(dataApi, XPHubApi);
    updateRoadBlockInformation(dataApi, XPHubApi);
}

export { retrieveData };
