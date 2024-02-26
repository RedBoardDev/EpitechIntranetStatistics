/* global chrome */

function getCookiesForEpitech() {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({}, (cookies) => {
            const epitechCookies = cookies.filter((cookie) => {
                return cookie.domain === "intra.epitech.eu" && cookie.name === "user";
            });

            if (epitechCookies && epitechCookies.length > 0) {
                resolve(epitechCookies);
            } else {
                reject(new Error("No Epitech user cookie found."));
            }
        });
    });
}

function handleGetToken(sendResponse) {
    getCookiesForEpitech()
        .then((cookies) => {
            const data = {
                refresh_token: cookies[0]['value'],
                status: true
            };
            sendResponse(data);
        })
        .catch((error) => {
            const data = {
                status: false,
                error: error.message
            };
            sendResponse(data);
        });
    return true;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.command) {
        case "GET_TOKEN":
            return handleGetToken(sendResponse);
        default:
            return false;
    }
});