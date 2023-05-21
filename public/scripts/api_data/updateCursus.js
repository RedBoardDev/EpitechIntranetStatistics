import { updateXPHubInformation } from './updateInformation.js';

const updateXPHubData = async (api, XPHubApi, generalNotesData) => {
    const location = api.getUserLocation();
    let pays = location[0];
    let region = location[1];

    const activitiesPublic = (await api.getDataFromAPI(`/module/${api.getScolarYear()}/B-INN-000/${pays}-0-1/?format=json`));
    const activitiesCampus = (await api.getDataFromAPI(`/module/${api.getScolarYear()}/B-INN-000/${region}-0-1/?format=json`));

    api.setNodeCourseCompleteData({ code: "B-INN-000", codeinstance: `${pays}-0-1` }, activitiesPublic);
    api.setNodeCourseCompleteData({ code: "B-INN-000", codeinstance: `${region}-0-1` }, activitiesCampus);

    const everyActivities = activitiesPublic.concat(activitiesCampus);
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
    console.log("XPHub participation:", XPHubApi.getParticipationVariable());
    const meXPHubVar = await XPHubApi.getMeVariable();
    console.log("XPHub me:", meXPHubVar);
    updateXPHubInformation(meXPHubVar);
}

export const updateAllCursusData = async (api, XPHubApi, generalNotesData) => {
   updateXPHubData(api, XPHubApi, generalNotesData);
   console.log("test", api.getGeneralCourseData());
}
