import {ApiCall} from "../scripts/ApiCall.js"
import {XPHub} from "../scripts/XPHub.js"

function parseJwtToken(token) {
    if (token === undefined || token === null)
        return undefined;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

const createElement = (document, type, data) => {
    const elem = document.createElement(type);
    if (type === "img")
        elem.src = data;
    if (type === "p")
        elem.innerHTML = data;
    return elem;
}

const appendElement = (document, element, targetName, targetType) => {
    var target;
    if (targetType === "id")
        target = document.getElementById(targetName);
    else if (targetType === "class")
        target = document.getElementsByClassName(targetName)[0];
    else
        return 84;
    target.appendChild(element);
    return 0;
}

function addNotesInformation(document, api, generalNotesData) {
    var elem;

    console.log(generalNotesData);
    const highestTEpitech = api.getHighestTEpitech(generalNotesData);
    console.log(highestTEpitech);
    elem = createElement(document, "p", highestTEpitech);
    appendElement(document, elem, "g_profil", "class");

    const {bestSoloStumper, bestDuoStumper} = api.getBestStumpers(generalNotesData);
    console.log(bestSoloStumper);
    elem = createElement(document, "p", bestSoloStumper);
    appendElement(document, elem, "g_profil", "class");
    console.log(bestDuoStumper);
    elem = createElement(document, "p", bestDuoStumper);
    appendElement(document, elem, "g_profil", "class");
}

function addUserInformation(document, api, generalUserData) {
    var elem;

    //email
    console.log(api.getUserEmail());
    elem = createElement(document, "p", api.getUserEmail());
    appendElement(document, elem, "g_profil", "class");
    //name + family name
    console.log(generalUserData['title']);
    elem = createElement(document, "p", generalUserData['title']);
    appendElement(document, elem, "g_profil", "class");

    //avatar img
    console.log(generalUserData['picture']);
    elem = createElement(document, "img", "https://intra.epitech.eu" + generalUserData['picture']);
    appendElement(document, elem, "profil_avatar", "id");
    //promotion
    console.log(api.getUserEmail());
    elem = createElement(document, "p", generalUserData['promo']);
    appendElement(document, elem, "g_profil", "class");

    //cursus
    console.log(generalUserData['course_code']);
    elem = createElement(document, "p", generalUserData['course_code']);
    appendElement(document, elem, "g_profil", "class");

    //semestre
    console.log(generalUserData['semester_code']);
    elem = createElement(document, "p", generalUserData['semester_code']);
    appendElement(document, elem, "g_profil", "class");

    //city
    console.log(generalUserData['groups'][0]['name']);
    elem = createElement(document, "p", generalUserData['groups'][0]['name']);
    appendElement(document, elem, "g_profil", "class");

    //credits
    console.log(generalUserData['credits']);
    elem = createElement(document, "p", generalUserData['credits']);
    appendElement(document, elem, "g_profil", "class");

    //G.P.A
    console.log(generalUserData['gpa'][0]['gpa']);
    elem = createElement(document, "p", generalUserData['gpa'][0]['gpa']);
    appendElement(document, elem, "g_profil", "class");

    //scolar years
    console.log(generalUserData['scolaryear']);
    elem = createElement(document, "p", generalUserData['scolaryear']);
    appendElement(document, elem, "g_profil", "class");
}

function addRoadBlocksInformation(api, generalNotesData) {
    const roadBlockCodes = api.getRoadBlocksCode(generalNotesData);
    roadBlockCodes.forEach(async ([codeinstance, codemodule]) => {
        let rsp = await api.getRoadBlockData(codemodule, codeinstance);
        console.log("Roadblock ", codeinstance, codemodule, rsp['title'], (rsp['description']).match('[0-9]+')[0]);
    });
}

async function addXPHub(XPHubApi, api, generalNotesData) {
    let pays = 'FR'; //TODO get this information with the API
    let region = 'MLH'; //TODO get this information with the API
    let login = "thomas.ott@epitech.eu"; //TODO get this information with the API
    const activitiesPublic = (await api.getDataFromAPI(`/module/${api.getScolarYear()}/B-INN-000/${pays}-0-1/?format=json`)).activites;
    const activitiesCampus = (await api.getDataFromAPI(`/module/${api.getScolarYear()}/B-INN-000/${region}-0-1/?format=json`)).activites;
    const everyActivities = activitiesPublic.concat(activitiesCampus);

    everyActivities.map((activite) => {
        if (activite.type_title) {
            if (activite.type_title === "Project") {
                XPHubApi.addProject(generalNotesData, activite.codeacti, activite.begin, activite.end);
            } else {
                activite.events.map((event) => {
                    if (event.user_status) XPHubApi.addActivite(activite.title, activite.type_title, event.user_status, event.begin);
                    else if (event.assistants.find((assistant) => assistant.login === login))
                    XPHubApi.addActivite(activite.title, activite.type_title, 'organisateur', event.begin);
                    else if (event.already_register) XPHubApi.addActivite(activite.title, activite.type_title, 'soon', event.begin);
                });
            }
        }
    });
    XPHubApi.countXpSoon();
    XPHubApi.countXPValidated();
    console.log("XPHub participation:", XPHubApi.getParticipationVariable());
    console.log("XPHub me:", XPHubApi.getMeVariable());
}

window.addEventListener('load', async () => {
    const api = new ApiCall();
    const XPHubApi = new XPHub();
    const rsp = await new Promise(resolve => {
        chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
    });
    const userEmail = parseJwtToken(rsp.refresh_token)['login'];
    api.setUserToken(rsp.refresh_token);
    api.setUserEmail(userEmail);

    const generalUserData = await api.getPreLoadData("general_user");
    const generalNotesData = await api.getPreLoadData("general_notes");
    api.setScolarYear(generalUserData['scolaryear'])
    console.log(generalUserData);
    addUserInformation(document, api, generalUserData);
    addNotesInformation(document, api, generalNotesData);
    addRoadBlocksInformation(api, generalNotesData);
    addXPHub(XPHubApi, api, generalNotesData['notes']);
});
