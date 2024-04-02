import { generateIdFromStr } from '../utils/crypto.js';
import { storeData, getData } from '../utils/webStorage.js';
class ApiData {
    #scolarYear;
    #location;
    #studentYear;

    #preLoad_generalUserData;
    #preLoad_generalNotesData;
    #preLoad_generalCourseData;

    constructor() {
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

    getStudentYear() {
        return this.#studentYear;
    }

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

    getUserLocation() {
        return this.#location.toString().split('/');
    }

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
    getGeneralCourseData() {
        const courseData = this.#preLoad_generalCourseData;

        if (!courseData) return null;
        return courseData;
    }
    getNodeOnCourseCompleteData(criteria) {
        const courseData = this.#preLoad_generalCourseData;
        if (!courseData) return null;

        // voir la ligne d'en dessous
        // return courseData.find(item => Object.keys(criteria).every(key => item[key] === criteria[key]))?.complete_data;
        for (let item of courseData) {
            if (Object.keys(criteria).every(key => item[key] === criteria[key])) {
                return item.complete_data;
            }
        }
        return null;
    }

    getNodeOnCourseData(criteria) {
        const courseData = this.#preLoad_generalCourseData;

        if (!courseData) return null;
        return courseData.filter(item => item.code === criteria.code && item.semester === criteria.semester);
    }

    setNodeCourseCompleteData(criteria, newCompleteData) {
        const courseData = this.#preLoad_generalCourseData;
        if (!courseData) return;

        // courseData.find(item => Object.keys(criteria).every(key => item[key] === criteria[key])).complete_data = newCompleteData;
        for (let item of courseData) {
            if (Object.keys(criteria).every(key => item[key] === criteria[key])) {
                item.complete_data = newCompleteData;
            }
        }
        this.#preLoad_generalCourseData = courseData;
    }

    // // general API function

    async getCurrent() {
        const general = await this.#callApi('GET', `?format=json`);
        if (!general) return null;
        const current = general['current'] ?? null;
        return current;
    }

    async getCompleteDataFromApi(codeModule, codeInstance) {
        return await this.#callApi('GET', `module/${this.getScolarYear()}/${codeModule}/${codeInstance}/?format=json`);
    }

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
        const apiBase = 'https://intra.epitech.eu/';
        var request = new Request(apiBase + endpoint, config);

        try {
            const response = await fetch(request, config);
            return response.json();
        } catch (error) {
            return null;
        }
    }

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

export { ApiData };
