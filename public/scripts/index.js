import { ApiData } from "./classes/ApiData.js";
import { EpitechData } from "./classes/EpitechData.js";
import { XPHub } from "./classes/XPHubApi.js";
import { parseJwtToken } from "./utils/crypto.js";
import { retrieveData } from "./retrieveData/retrieveData.js";
import { getData } from "./utils/webStorage.js";

/* global chrome */

async function initApiData() {
    let refresh_token = getData('refresh_token');

    if (!refresh_token) {
        const data = await new Promise(resolve => {
            chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
        });
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

    const api = new ApiData();
    await api.init(refresh_token, jwtToken['login']);
    return api;
}

window.addEventListener('load', async () => {
    const epitechData = new EpitechData();
    const XPHubData = new XPHub(epitechData.getHubActivities());
    const apiData = await initApiData();

    if (!epitechData || !XPHubData || !apiData) return;
    apiData.sendTracking();
    await retrieveData(epitechData, XPHubData, apiData);
});
