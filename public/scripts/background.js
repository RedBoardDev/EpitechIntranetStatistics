chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "OPEN_NEW_TAB") {
        chrome.tabs.update({url: chrome.runtime.getURL("index.html")});
    }
});
