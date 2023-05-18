const userData = {
    refresh_token: null,
    language: null,
    status: null
}

const waitForVar = () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
            if (userData.refresh_token !== null) {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
};

function getCookiesForEpitech() {
    return new Promise((resolve) => {
        chrome.cookies.getAll({}, (cookies) => {
            resolve(cookies.filter((cookie) => {
                return cookie.domain === "intra.epitech.eu" && cookie.name === "user";
            }));
        });
    });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "OPEN_NEW_TAB") {
        getCookiesForEpitech().then((data) => {
            if (data && data[0] && data[0]['value']) {
                userData.refresh_token = data[0]['value'];
                userData.status = 'SUCCESS';
            } else {
                userData.status = 'FAIL';
            }
        });
        waitForVar().then(() => {
            chrome.tabs.create({url: chrome.runtime.getURL("index.html")});
        });
    }
    if (request.command === "GET_TOKEN") {
        getCookiesForEpitech().then((data) => {
            if (data && data[0] && data[0]['value']) {
                userData.refresh_token = data[0]['value'];
                userData.status = 'SUCCESS';
            } else {
                userData.status = 'FAIL';
            }
        });
        sendResponse({userData});
    }
});
