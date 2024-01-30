import { generateIdFromStr } from './crypto.js';
import { storeData, getData } from './webStorage.js';
class ApiCall {
    // #preLoadData;
    #scolarYear;
    #location;
    #studentYear;

    #preLoad_generalUserData;
    #preLoad_generalNotesData;
    #preLoad_generalCourseData;

    constructor() {
        // this.#preLoadData = new Map();
        this.#scolarYear = undefined;
        this.#location = undefined;
        this.#studentYear = undefined;

        this.#preLoad_generalUserData = {};
        this.#preLoad_generalNotesData = {};
        this.#preLoad_generalCourseData = {};
    }

    async init(refreshToken, email) {
        if (!refreshToken || !email) return undefined;
        storeData('refresh_token', refreshToken);
        storeData('user_email', email);

        const userData = await this.#callApi('GET', `user/${email}?format=json`)
        this.#setScolarYear(userData['scolaryear'])
        this.#setUserLocation(userData['location']);
        this.#preLoad_generalUserData = userData;
        this.#studentYear = userData['studentyear'];

        const notesData = await this.#callApi('GET', `user/${email}/notes?format=json`);
        this.#preLoad_generalNotesData = notesData;

        const dataCursus = await this.#callApi('GET', `course/filter?format=json`);
        const filteredDataCursus = dataCursus
            // voir si c'est pas active_promo qu'il faut garder au lieu de check scolarYear
            .filter(item => item.id && Number(item.scolaryear) === Number(this.getScolarYear()))
            .map(item => {
                return {
                    id: (item.id ?? undefined),
                    semester: (item.semester ?? undefined),
                    num: (item.num ?? undefined),
                    begin: (item.begin ?? undefined),
                    end: (item.end ?? undefined),
                    end_register: (item.end_register ?? undefined),
                    scolaryear: (item.scolaryear ?? undefined),
                    code: (item.code ?? undefined),
                    codeinstance: (item.codeinstance ?? undefined),
                    location_title: (item.location_title ?? undefined),
                    instance_location: (item.instance_location ?? undefined),
                    flags: (item.flags ?? undefined),
                    credits: (item.credits ?? undefined),
                    status: (item.status ?? undefined),
                    active_promo: (item.active_promo ?? undefined),
                    open: (item.open ?? undefined),
                    title: (item.title ?? undefined),
                    complete_data: undefined,
                    for_timeline: 0
                };
            });
        this.#preLoad_generalCourseData = filteredDataCursus;
    }

    // getter / setter function

    // getStudentYear() {
    //     return this.#studentYear;
    // }

    #getUserToken() {
        return getData('refresh_token');
    }

    getUserEmail() {
        return getData('user_email');
    }

    getScolarYear() {
        return this.#scolarYear.toString();
    }

    #setScolarYear(scolarYear) {
        this.#scolarYear = scolarYear;
    }

    // getUserLocation() {
    //     return this.#location.toString().split('/');
    // }

    #setUserLocation(location) {
        this.#location = location;
    }

    getGeneralUserData() {
        return this.#preLoad_generalUserData;
    }

    getGeneralNotesData() {
        return this.#preLoad_generalNotesData;
    }

    // general_course - getter / setter function
    // getGeneralCourseData() {
    //     return this.#preLoadData.get("general_course");
    // }

    // setGeneralCourseData(newData) {
    //     this.#preLoadData.set("general_course", newData);
    // }

    // getNodeOnCourseCompleteData(criteria) {
    //     const courseData = this.#preLoadData.get("general_course");
    //     if (!courseData) return null;

    //     // return courseData.find(item => Object.keys(criteria).every(key => item[key] === criteria[key]))?.complete_data;
    //     for (let item of courseData) {
    //         if (Object.keys(criteria).every(key => item[key] === criteria[key])) {
    //             return item.complete_data;
    //         }
    //     }
    //     return null;
    // }

    // getNodeOnCourseData(criteria) {
    //     const courseData = this.#preLoadData.get("general_course");

    //     if (!courseData) return null;
    //     return courseData.filter(item => item.code === criteria.code && item.semester === criteria.semester);
    // }

    // setNodeCourseCompleteData(criteria, newCompleteData) {
    //     const courseData = this.#preLoadData.get("general_course");
    //     if (!courseData) return;

    //     // courseData.find(item => Object.keys(criteria).every(key => item[key] === criteria[key])).complete_data = newCompleteData;
    //     for (let item of courseData) {
    //         if (Object.keys(criteria).every(key => item[key] === criteria[key])) {
    //             item.complete_data = newCompleteData;
    //         }
    //     }
    //     this.#preLoadData.set("general_course", courseData);
    // }

    // // general API function

    // async getPresenceData(moduleCode, activityCode, eventCode) {
    //     const email = this.getUserEmail();
    //     const location = this.getUserLocation();
    //     let region = location[1];

    //     const rsp = await this.#callApi('GET', `module/${this.getScolarYear()}/${moduleCode}/${region}-0-1/${activityCode}/${eventCode}/registered/?format=json`);
    //     const node = rsp.find(item => item.login === email && item.registered === "1");
    //     return node ? node : null;
    // }

    // getBestStumpers(generalNotesData) {
    //     var bestSoloStumper = 0;
    //     var bestDuoStumper = 0;
    //     generalNotesData['notes'].forEach(element => {
    //         if (element.titlemodule.includes("B2 - Stumpers")) {
    //             if (element.title.includes("Solo"))
    //                 bestSoloStumper = element.final_note;
    //             else
    //                 bestDuoStumper = element.final_note;
    //         }
    //     });
    //     return { bestSoloStumper, bestDuoStumper };
    // }

    // getRoadBlocksCode(generalNotesData) { // get codemodule and codeInstance
    //     var roadBlockCodes = [];
    //     if (this.#preLoadData.has("roadblock_code")) return this.#preLoadData.get("roadblock_code");
    //     generalNotesData['modules'].forEach(element => {
    //         if (element.scolaryear == this.getScolarYear() && element.barrage == 200) {
    //             const codeinstance = (element.codeinstance).toString();
    //             const codemodule = (element.codemodule).toString();
    //             roadBlockCodes.push([codeinstance, codemodule]);
    //         }
    //     });
    //     this.#preLoadData.set("roadblock_code", roadBlockCodes);
    //     return roadBlockCodes;
    // }

    // async getRoadBlockData(codemodule, codeinstance) {
    //     var roadBlockData;
    //     if (this.#preLoadData.has(`roadblock_data-${codemodule}`)) return this.#preLoadData.get(`roadblock_data-${codemodule}`);
    //     roadBlockData = await this.#callApi('GET', `module/${this.getScolarYear()}/${codemodule}/${codeinstance}/?format=json`);
    //     this.#preLoadData.set(`roadblock_data-${codemodule}`, roadBlockData);
    //     return roadBlockData;
    // }

    // // preload data function

    async #callApi(method, endpoint) {
        if (endpoint === undefined || endpoint === null)
            return null;
        var config = {
            method: method,
            headers: {
                Cookies: this.#getUserToken()
            }
        };
        const apiBase = (false ? 'http://127.0.0.1:3900/proxy/' : 'https://intra.epitech.eu/');
        var request = new Request(apiBase + endpoint, config);

        try {
            const response = await fetch(request, config);
            return response.json();
        } catch (error) {
            return null;
        }
    }

    // getPreLoadData(key) {
    //     return this.#preLoadData.get(key);
    // }

    async sendTracking() {
        if (!this.getUserEmail()) return;
        const storedTrackingId = getData('tracker_id')

        let encryptedEmail;
        if (storedTrackingId) {
            encryptedEmail = storedTrackingId;
        } else {
            encryptedEmail = await generateIdFromStr(this.getUserEmail());
            storeData('tracker_id', encryptedEmail);
        }
        var config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userId": encryptedEmail,
            })
        };

        try {
            var request = new Request('https://tracker.thomasott.fr/api/track', config);
            const response = await fetch(request);
            return (!response.ok && response.status !== 429);
        } catch (error) {
            return 1;
        }
    }
}

export { ApiCall };
