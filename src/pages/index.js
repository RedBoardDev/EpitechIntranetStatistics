window.addEventListener('load', async () => {
    chrome.runtime.sendMessage({ command: 'GET_TOKEN' }, (response) => {
        const refresh_token = response.refresh_token;
        localStorage.setItem("refresh_token", refresh_token);
      });
});

