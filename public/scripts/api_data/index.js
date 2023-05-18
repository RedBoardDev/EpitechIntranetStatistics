import { ApiCall } from "./ApiCall.js"
import { XPHub } from "./XPHubApi.js"
import { updateActiveTimeChart, updateUserInformation, updateImportantDataCard } from "./updateInformation.js";

function parseJwtToken(token) {
    if (token === undefined || token === null)
        return undefined;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

async function initApiCall() {
    const api = new ApiCall();
    const rspMessage = await new Promise(resolve => {
        chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
    });
    const userData = rspMessage['userData'];
    const refreshToken = userData['refresh_token'];
    const jwtToken = parseJwtToken(refreshToken);
    if (userData['status'] !== 'SUCCESS' || !refreshToken || !jwtToken['login']) {
        console.log("GET TOKEN FAILED, CALL ERROR404 PAGE.");
    }
    api.setUserToken(refreshToken);
    api.setUserEmail(jwtToken['login']);
    api.preLoadBaseData();
    const generalUserData = await api.getPreLoadData("general_user");
    api.setScolarYear(generalUserData['scolaryear'])
    api.setUserLocation(generalUserData['location']);
    return (api);
}

window.addEventListener('load', async () => {
    const XPHubApi = new XPHub();
    const api = await initApiCall();
    const generalUserData = await api.getPreLoadData("general_user");
    const generalNotesData = await api.getPreLoadData("general_notes");

    updateActiveTimeChart(api);
    updateUserInformation(api, generalUserData);
    updateImportantDataCard(api, generalUserData, generalNotesData);
});
