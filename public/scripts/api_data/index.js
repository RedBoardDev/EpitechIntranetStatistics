import { ApiCall } from "./ApiCall.js";
import { XPHub } from "./XPHubApi.js";
import { dashboardScript } from "./dashboard.js";
import { updateAllCursusData } from "./updateCursus.js";
import { updateActiveTimeChart, updateUserInformation, updateImportantDataCard, updateMessageAndAlert } from "./updateInformation.js";

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
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
    });
    const userData = rspMessage['userData'];
    const refreshToken = userData['refresh_token'];
    const jwtToken = parseJwtToken(refreshToken);
    if (userData['status'] !== 'SUCCESS' || !refreshToken || !jwtToken['login']) {
        console.log("GET TOKEN FAILED, CALL ERROR404 PAGE.");
        return undefined;
    }
    api.setUserToken(refreshToken);
    api.setUserEmail(jwtToken['login']);
    await api.preLoadDataFct();
    return (api);
}

window.addEventListener('load', async () => {
    const XPHubApi = new XPHub();
    let api;
    api = await initApiCall();
    if (api === undefined) {
        location.reload();
        api = await initApiCall();
        if (api === undefined) {
            return;
        }
    }
    const generalUserData = await api.getPreLoadData("general_user");
    const generalNotesData = await api.getPreLoadData("general_notes");

    updateActiveTimeChart(api);
    updateMessageAndAlert(api);
    updateUserInformation(api, generalUserData);
    updateImportantDataCard(api, generalUserData, generalNotesData);
    const timeLineData = await updateAllCursusData(api, XPHubApi, generalNotesData);
    dashboardScript(api, timeLineData);
});
