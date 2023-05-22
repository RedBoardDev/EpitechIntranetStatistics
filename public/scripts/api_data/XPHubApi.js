class XPHub {
    #xpAct;
    #participation;
    #me;

    constructor() {
        this.#me = { nbXps: 0, nbXpsSoon: 0, soon: [], activList: []};
        this.#participation = {
            talk: 0,
            workshop: 0,
            hackaton: 0,
            experience: 0,
            project: 0,
        }
        this.#xpAct = [
            {
                key: 1,
                name: 'Talk',
                alias: ['Meetup'],
                xpWinPart: 1,
                xpWinOrg: 4,
                xpLostPart: 1,
                limitPart: 15,
                limitOrg: 6,
                nbPart: 0,
                nbOrg: 0,
            },
            {
                key: 2,
                name: 'Workshop',
                alias: [],
                xpWinPart: 2,
                xpWinOrg: 7,
                xpLostPart: 2,
                limitPart: 10,
                limitOrg: 3,
                nbPart: 0,
                nbOrg: 0,
            },
            {
                key: 3,
                name: 'Hackathon',
                alias: [],
                xpWinPart: 6,
                xpWinOrg: 15,
                xpLostPart: 6,
                limitPart: 100,
                limitOrg: 100,
                nbPart: 0,
                nbOrg: 0,
            },
            {
                key: 4,
                name: 'Experience',
                alias: [],
                xpWinPart: 3,
                xpWinOrg: 0,
                xpLostPart: 0,
                limitPart: 8,
                limitOrg: 0,
                nbPart: 0,
                nbOrg: 0,
            }
        ];
    }

    requestGet = async (url) => {
        let data;

        try {
            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });
            data = await res.json();
        } catch (e) {
            console.log(e);
            throw 'Invalid request';
        }
        return data;
    };

    getProfil = async () => {
        return await this.requestGet(`${this.baseUrl}/user/?format=json`);
    };

    getActivitiesHub = async (scolaryear, region) => {
        return await this.requestGet(`${this.baseUrl}/module/${scolaryear}/B-INN-000/${region}-0-1/?format=json`);
    };

    getEveryNotes = async () => {
        return await this.requestGet(`${this.baseUrl}/user/thomas.ott@epitech.eu/notes/?format=json`);
    };

    getAllExperiences = async (scolaryear, activities, region, login) => {
        const url = `${this.baseUrl}/module/${scolaryear}/B-INN-000/${region.split('/')[ 1 ]}-0-1`;
        try {
            let res = await Promise.all(
                activities.map((act) => {
                    return fetch(`${url}/${act?.codeacti}/note/?format=json`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                }),
            );
            res = await Promise.all(
                res?.map((result) => {
                    return result.json();
                }),
            );
            res?.map((result) => {
                if (Object.keys(result).length === 0 && result.constructor === Object) return undefined;
                const act = result?.find((user) => user.login === login);
                if (act?.note === 100) this.addActivite('Experience', 'Experience', 'present', act?.date);
            });
        } catch (e) {
            console.log(e);
        }
    };

    dateIsPassed = (targetDate) => {
        const actualDate = new Date();
        return targetDate < actualDate;
    };

    addProject = (everyNotes, codeacti, date_begin, date_end) => {
        let date1 = new Date(date_begin);
        let date2 = new Date(date_end);
        let dayDifference = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
        everyNotes.forEach(element => {
            if (element.codeacti === codeacti) {
                if (this.dateIsPassed(date2)) {
                    this.#me.nbXps += (dayDifference * 2) * element.final_note / 100;
                    this.#participation.project += 1;
                } else
                    this.#me.nbXpsSoon += (dayDifference * 2);
            }
        });
    };

    addActivite = (title, type, status, date) => {
    const findAct = this.#xpAct.find((act) => act.name === type || act.alias.includes(type));
        if (findAct === null || findAct === undefined) {
            return;
        }
        const { limitPart, xpWinPart, xpWinOrg, nbPart, xpLostPart, nbOrg, limitOrg } = findAct;

        switch (status) {
            case 'present':
                nbPart < limitPart && (this.#me.nbXps += xpWinPart) && (findAct.nbPart += 1);
                this.#me.activList.push({ title, type, status: 'present', date });
                break;
            case 'absent':
                this.#me.nbXps -= xpLostPart;
                this.#me.activList.push({ title, type, status: 'absent', date });
                break;
            case 'organisateur':
                nbOrg < limitOrg && (this.#me.nbXps += xpWinOrg) && (findAct.nbOrg += 1);
                this.#me.activList.push({ title, type, status: 'organisateur', date });
                break;
            case 'soon':
                this.#me.activList.push({ title, type, status: 'inscrit', date });
                break;
            default:
                break;
        }
    };

    countXpSoon = () => {
        this.#me.activList.map((act) => {
            if (act.status !== 'inscrit')
                return undefined;
            const findAct = this.#xpAct.find((elem) => elem.name === act.type || elem.alias.includes(act.type));
            const { xpWinPart, limitPart, nbPart } = findAct;
            nbPart < limitPart && (this.#me.nbXpsSoon += xpWinPart) && findAct.nbPart++;
        });
    };

    countXPValidated = () => {
        this.#me.activList.forEach(element => {
            if (element.status !== 'present') return;
            switch (element.type) {
                case 'Talk':
                    this.#participation.talk += 1;
                    break;
                case 'Workshop':
                    this.#participation.workshop += 1;
                    break;
                case 'Hackathon':
                    this.#participation.hackaton += 1;
                    break;
                case 'Experience':
                    this.#participation.experience += 1;
                    break;
                default:
                    console.log("Unknown element:", element.type);
                    break;
            }
        });
    }

    getParticipationVariable = () => {
        return this.#participation;
    }

    getMeVariable = () => {
        return this.#me;
    }
}

export { XPHub };
