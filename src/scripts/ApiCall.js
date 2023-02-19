class ApiCall {
    constructor() {
        window.localStorage.setItem("refresh_token", null);
        window.localStorage.setItem("user_email", null);
    }
    getUserToken() {
        return window.localStorage.getItem("refresh_token");
    }
    setUserToken(refreshToken) {
        window.localStorage.setItem("refresh_token", refreshToken);
    }
    getUserEmail() {
        return window.localStorage.getItem("user_email");
    }
    setUserEmail(userEmail) {
        window.localStorage.setItem("user_email", userEmail);
    }
}

export { ApiCall };
