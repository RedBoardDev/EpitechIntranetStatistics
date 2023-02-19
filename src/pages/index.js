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

window.addEventListener('load', async () => {
    const api = new ApiCall();
    const rsp = await new Promise(resolve => {
        chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, resolve);
    });
    const userEmail = parseJwtToken(rsp.refresh_token)['login'];
    api.setUserToken(rsp.refresh_token);
    api.setUserEmail(userEmail);
    console.log(api.getUserToken());
    console.log(api.getUserEmail());
    console.log(api.getloadData("general_user"));
});
