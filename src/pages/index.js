import {ApiCall} from "../scripts/ApiCall.js"

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

function addUserInformation(document, generalUserData, api) {
    var elem;
    var target;

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

window.addEventListener('load', async () => {
    const api = new ApiCall();
    const rsp = await new Promise(resolve => {
        chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
    });
    const userEmail = parseJwtToken(rsp.refresh_token)['login'];
    api.setUserToken(rsp.refresh_token);
    api.setUserEmail(userEmail);

    const generalUserData = await api.getPreLoadData("general_user");
    console.log(generalUserData);
    addUserInformation(document, generalUserData, api);
});
