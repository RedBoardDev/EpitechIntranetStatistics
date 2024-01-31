import { ApiCall } from "./ApiCall.js";
import { XPHub } from "./XPHubApi.js";
import { parseJwtToken } from "./crypto.js";
import { retrieveData } from "./retrieveData.js";
import { getData } from "./webStorage.js";

/* global chrome */

async function initApiCall() {
    let refresh_token = getData('refresh_token');

    if (!refresh_token) {
        // const data = await new Promise(resolve => {
        //     chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
        // });
        const data = {
            refresh_token: '',
            status: true
        }
        if (!data || data['status'] !== true) {
            console.error(data['error']);
            return undefined;
        }
        refresh_token = data['refresh_token'];
    }

    const jwtToken = parseJwtToken(refresh_token);
    if (!jwtToken['login']) {
        console.error("Retrieve email failed.");
        return undefined;
    }

    const api = new ApiCall();
    await api.init(refresh_token, jwtToken['login']);
    return api;
}

window.addEventListener('load', async () => {
    const XPHubApi = new XPHub();
    const dataApi = await initApiCall();
    if (!XPHubApi || !dataApi) return;
    // dataApi.sendTracking();
    retrieveData(XPHubApi, dataApi);
});
