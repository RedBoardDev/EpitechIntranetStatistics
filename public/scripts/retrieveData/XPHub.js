import { updateFrontend } from "../updateFrontend.js";

export const getXPHubData = async (api, XPHubApi) => {
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
        xp_completed: XPHub_me.nbXps,
        xp_in_progress: XPHub_me.nbXpsSoon,
        xp_lost: XPHub_me.nbXpsLost,
        activities_per_type: XPHub_xpAct,
    };
    updateFrontend('hub', XPHub);
}
