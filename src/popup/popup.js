function getCookies() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
            type: "GET_COOKIES"
        }).then((response) => {
            resolve(response.response);
        }).catch((error) => {
            console.error(`Error when sending message: ${error}`);
            reject(error);
        });
    })
}

window.onload = async () => {
    document.getElementById("open").addEventListener("click", function() {
        getCookies().then((cookiesData) => {
            localStorage.setItem("token", cookiesData[0].value);
        }).catch((error) => {
            console.log("Unable to load cookies", error);
        });
    }
)};
