import { updateFrontend } from "../utils/updateFrontend.js";

export const getXPHubData = async (epitechData, apiData, XPHubData) => {
    const generalNotesData = await apiData.getGeneralNotesData();
    const hubUnit = epitechData.getHubUnit();

    const location = apiData.getUserLocation();
    const pays = location[0];
    const region = location[1];

    let activitiesPublic = await apiData.getNodeOnCourseCompleteData({ code: hubUnit, codeinstance: `${pays}-0-1` });
    let activitiesCampus = await apiData.getNodeOnCourseCompleteData({ code: hubUnit, codeinstance: `${region}-0-1` });
    if (activitiesPublic === undefined) {
        activitiesPublic = null;
        activitiesPublic = (await apiData.getCompleteDataFromApi(hubUnit, `${pays}-0-1`));
        apiData.setNodeCourseCompleteData({ code: hubUnit, codeinstance: `${pays}-0-1` }, activitiesPublic);
    }
    if (activitiesCampus === undefined) {
        activitiesCampus = null;
        activitiesCampus = (await apiData.getCompleteDataFromApi(hubUnit, `${region}-0-1`));
        apiData.setNodeCourseCompleteData({ code: hubUnit, codeinstance: `${region}-0-1` }, activitiesCampus);
    }
    const everyActivities = [
        ...(activitiesPublic?.activites || []),
        ...(activitiesCampus?.activites || [])
    ];
    everyActivities.map((activite) => {
        if (activite.type_title && activite.type_title === "Project") {
            // for optimisation, we can store each project and do addProject with every project to avoid multiple loops of generalNotesData
            XPHubData.addProject(generalNotesData['notes'], activite.codeacti, activite.begin, activite.end);
        } else {
            activite.events.map((event) => {
                if (event.user_status)
                    XPHubData.addActivite(activite.title, activite.type_title, event.user_status, event.begin);
                else if (event.assistants.find((assistant) => assistant.login === apiData.getUserEmail()))
                    XPHubData.addActivite(activite.title, activite.type_title, 'organisateur', event.begin);
                else if (event.already_register) XPHubData.addActivite(activite.title, activite.type_title, 'soon', event.begin);
            });
        }
    });
    XPHubData.countXpSoon();
    const XPHub_me = await XPHubData.getMeVariable();
    let XPHub_xpAct = await XPHubData.getxpAct();
    XPHub_xpAct.map((node) => {
        const types = node.alias;
        types.push(node.name);

        const activList = XPHub_me.activList;
        const activities = activList.filter((act) => types.includes(act.type));
        node['activities'] = activities;
    });
    const XPHub = {
        xp_completed: XPHub_me.nbXps,
        xp_in_progress: XPHub_me.nbXpsSoon,
        xp_lost: XPHub_me.nbXpsLost,
        activities_per_type: XPHub_xpAct,
    };
    updateFrontend('hub', XPHub);
}
