function parseJwtToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

window.addEventListener('load', async () => {
    chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, (response) => {
        const refresh_token = response.refresh_token;
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("email", parseJwtToken(refresh_token)['login']);
      });
});
