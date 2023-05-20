class ApiCall {
    #preLoadData;
    #scolarYear;
    #location;
    constructor() {
        window.localStorage.setItem("refresh_token", null);
        window.localStorage.setItem("user_email", null);
        this.#preLoadData = new Map();
    }

    preLoadBaseData() {
        const email = this.getUserEmail();
        this.#preLoadData.set("general_user", this.getDataFromAPI(`user/${email}?format=json`));
        this.#preLoadData.set("general_notes", this.getDataFromAPI(`user/${email}/notes?format=json`));
        this.#preLoadData.set("general_course", this.getDataFromAPI(`course/filter?format=json`));
    }

    // getter / setter function

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

    getScolarYear() {
        return this.#scolarYear.toString();
    }

    setScolarYear(scolarYear) {
        this.#scolarYear = scolarYear;
    }

    getUserLocation() {
        return this.#location.toString().split('/');
    }

    setUserLocation(location) {
        this.#location = location;
    }

    // general API function

    getHighestTEpitech(generalNotesData) {
        var highestTEpitech = 0;
        generalNotesData['notes'].forEach(element => {
            if (element.title == "Self-assessment TEPitech" && element.scolaryear == this.getScolarYear()) {
                if (element.final_note > highestTEpitech) {
                    highestTEpitech = element.final_note;
                }
            }
        });
        return highestTEpitech;
    }

    getBestStumpers(generalNotesData) {
        var bestSoloStumper = 0;
        var bestDuoStumper = 0;
        generalNotesData['notes'].forEach(element => {
            if (element.titlemodule.includes("B2 - Stumpers")) {
                if (element.title.includes("Solo"))
                    bestSoloStumper = element.final_note;
                else
                    bestDuoStumper = element.final_note;
            }
        });
        return {bestSoloStumper, bestDuoStumper};
    }

    getRoadBlocksCode(generalNotesData) { // get codemodule and codeInstance
        var roadBlockCodes = [];
        if (this.#preLoadData.has("roadblock_code")) return this.#preLoadData.get("roadblock_code");
        generalNotesData['modules'].forEach(element => {
            if (element.scolaryear == this.getScolarYear() && element.barrage == 200) {
                const codeinstance = (element.codeinstance).toString();
                const codemodule = (element.codemodule).toString();
                roadBlockCodes.push([codeinstance, codemodule]);
            }
        });
        this.#preLoadData.set("roadblock_code", roadBlockCodes);
        return roadBlockCodes;
    }

    async getRoadBlockData(codemodule, codeinstance) {
        var roadBlockData;
        if (this.#preLoadData.has(`roadblock_data-${codemodule}`)) return this.#preLoadData.get(`roadblock_data-${codemodule}`);
        roadBlockData = await this.getDataFromAPI(`module/${this.getScolarYear()}/${codemodule}/${codeinstance}/?format=json`);
        this.#preLoadData.set(`roadblock_data-${codemodule}`, roadBlockData);
        return roadBlockData;
    }

    // preload data function

    async getDataFromAPI(endpoint) {
        if (endpoint === undefined || endpoint === null)
            return null;
        var config = {
            method: 'GET',
            headers: {
                Cookies: this.getUserToken()
            }
        };
        var request = new Request('https://intra.epitech.eu/' + endpoint, config);
        try {
            const response = await fetch(request, config);
            return response.json();
          } catch (error) {
            return null;
          }
        }

    getPreLoadData(key) {
        return this.#preLoadData.get(key);
    }
}

export { ApiCall };
