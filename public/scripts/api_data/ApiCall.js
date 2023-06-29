class ApiCall {
    #preLoadData;
    #scolarYear;
    #location;
    #studentYear
    constructor() {
        window.localStorage.setItem("refresh_token", null);
        window.localStorage.setItem("user_email", null);
        this.#preLoadData = new Map();
    }

    async preLoadDataFct() {
        const email = this.getUserEmail();
        const userData = await this.getDataFromAPI(`user/${email}?format=json`)
        this.setScolarYear(userData['scolaryear'])
        this.setUserLocation(userData['location']);
        this.#preLoadData.set("general_user", userData);
        this.#studentYear = userData['studentyear'];

        const notesData = await this.getDataFromAPI(`user/${email}/notes?format=json`);
        this.#preLoadData.set("general_notes", notesData);

        const dataCursus = await this.getDataFromAPI(`course/filter?format=json`);
        const filteredDataCursus = dataCursus
        // voir si c'est pas active_promo qu'il faut garder au lieu de check scolarYear
        .filter(item => item.id && Number(item.scolaryear) === Number(this.getScolarYear()))
        .map(item => {
            return {
                id: item.id,
                semester: item.semester,
                num: item.num,
                begin: item.begin,
                end: item.end,
                end_register: item.end_register,
                scolaryear: item.scolaryear,
                code: item.code,
                codeinstance: item.codeinstance,
                location_title: item.location_title,
                instance_location: item.instance_location,
                flags: item.flags,
                credits: item.credits,
                status: item.status,
                active_promo: item.active_promo,
                open: item.open,
                title: item.title,
                complete_data: undefined,
                for_timeline: 0
            };
        });
        this.#preLoadData.set("general_course", filteredDataCursus);
    }

    // getter / setter function

    getStudentYear() {
        return this.#studentYear;
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

    // general_course - getter / setter function
    getGeneralCourseData() {
        return this.#preLoadData.get("general_course");
    }

    setGeneralCourseData(newData) {
        this.#preLoadData.set("general_course", newData);
    }

    getNodeOnCourseCompleteData(criteria) {
        const courseData = this.#preLoadData.get("general_course");
        if (!courseData) return null;

        for(let item of courseData){
            if(Object.keys(criteria).every(key => item[key] === criteria[key])){
                return item.complete_data;
            }
        }
        return null;
    }

    getNodeOnCourseData(criteria) {
        const courseData = this.#preLoadData.get("general_course");
        if (!courseData) return null;

        for(let item of courseData){
            if(Object.keys(criteria).every(key => item[key] === criteria[key])){
                return item;
            }
        }
        return null;
    }

    setNodeCourseCompleteData(criteria, newCompleteData) {
        const courseData = this.#preLoadData.get("general_course");
        if (!courseData) return;

        for (let item of courseData) {
            if (Object.keys(criteria).every(key => item[key] === criteria[key])) {
                item.complete_data = newCompleteData;
            }
        }
        this.#preLoadData.set("general_course", courseData);
    }

    // general API function

    getHighestTEpitech(generalNotesData) {
        var highestTEpitech = 0;
        generalNotesData['notes'].forEach(element => {
            if (element.title === "TEPitech" && (element.scolaryear).toString() === this.getScolarYear()) {
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
