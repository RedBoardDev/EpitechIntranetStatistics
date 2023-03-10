const userData = {
    refresh_token: null,
    language: null
}

function getCookiesForEpitech() {
    return new Promise((resolve) => {
        chrome.cookies.getAll({}, (cookies) => {
            resolve(cookies.filter((cookie) => {
                return cookie.domain == "intra.epitech.eu" && cookie.name === "user";
            }));
        });
    });
};

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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "OPEN_NEW_TAB") {
        getCookiesForEpitech().then((data) => {
            userData.refresh_token = data[0]['value'];
            // userData.language = localStorage.getItem('language');
            console.log("language:", request.window.getItem('language'));
        });
        waitForVar().then(() => {
            chrome.tabs.update({url: chrome.runtime.getURL("src/pages/index.html")});
        });
    }
    if (request.command === "GET_TOKEN") {
        sendResponse({refresh_token: userData.refresh_token});
        userData.refresh_token = null;
    }
});
