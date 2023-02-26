class ApiCall {
    #preLoadData;
    constructor() {
        window.localStorage.setItem("refresh_token", null);
        window.localStorage.setItem("user_email", null);
        this.#preLoadData = new Map();
        this.#preLoadData.set("general_user", this.#getApiData('user/thomas.ott@epitech.eu?format=json'));
        this.#preLoadData.set("general_notes", this.#getApiData('user/thomas.ott@epitech.eu/notes?format=json'));
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

    async #getApiData(endpoint) {
        if (endpoint === undefined || endpoint === null)
            return null;
        var config = {
            method: 'GET',
            headers: {
                Cookies: this.getUserToken()
            }
        };
        var request = new Request('https://intra.epitech.eu/' + endpoint, config);
        return fetch(request, config)
        .then(function(response) {
            return response.json();
        })
        .catch(function(err) {
            console.log(err.message);
            return null;
        });
    }

    getPreLoadData(key) {
        return this.#preLoadData.get(key);
    }
}

export { ApiCall };
