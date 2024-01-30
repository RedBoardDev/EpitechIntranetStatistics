import { ApiCall } from "./ApiCall.js";
import { XPHub } from "./XPHubApi.js";
import { parseJwtToken } from "./crypto.js";
import { retrieveData } from "./retrieveData.js";

/* global chrome */

async function initApiCall() {
    const data = await new Promise(resolve => {
        chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
    });

    if (data['status'] !== true) {
        console.error(data['error']);
        return undefined;
    }

    const jwtToken = parseJwtToken(data['refresh_token']);
    if (!jwtToken['login']) {
        console.error("Retrieve email failed.");
        return undefined;
    }

    const api = new ApiCall();
    await api.init(data['refresh_token'], jwtToken['login']);
    return api;
}

window.addEventListener('load', async () => {
    const XPHubApi = new XPHub();
    const dataApi = await initApiCall();
    if (!XPHubApi || !dataApi) return;
    // dataApi.sendTracking();
    retrieveData(XPHubApi, dataApi);
});
