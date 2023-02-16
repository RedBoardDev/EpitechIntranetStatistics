function getCookiesForEpitech() {
    return new Promise((resolve) => {
        chrome.cookies.getAll({}, (cookies) => {
            resolve(cookies.filter((cookie) => {
                return cookie.domain == "intra.epitech.eu" && cookie.name === "user";
            }));
        });
    });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "OPEN_NEW_TAB") {
        chrome.tabs.create({ url: chrome.runtime.getURL("src/pages/index.html") });
        getCookiesForEpitech().then((data) => {
            chrome.storage.local.set({ 'user_token': data[0]['value'] });
        });
    }
  });