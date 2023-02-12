function getCookiesForEpitech() {
    return new Promise((resolve) => {
        chrome.cookies.getAll({}, (cookies) => {
            resolve(cookies.filter((cookie) => {
                return cookie.domain == "intra.epitech.eu" && cookie.name === "user";
            }));
        });
    });
};

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type } = obj;

    if (type === "GET_COOKIES") {
        getCookiesForEpitech().then((data) => {
            response({ response: data });
        });
        return true;
    }
});
