class XPHub {
    #xpAct;
    #me;

    constructor() {
        this.#me = { nbXps: 0, nbXpsSoon: 0, soon: [], activList: []};
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
                nbXPTotal: 0
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
                nbXPTotal: 0
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
                nbXPTotal: 0
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
                nbXPTotal: 0
            },
            {
                key: 5,
                name: 'Project',
                alias: [],
                nbPart: 0,
                nbXPTotal: 0
            }
        ];
    }

    dateIsPassed = (targetDate) => {
        const actualDate = new Date();
        return targetDate < actualDate;
    };

    addProject = (everyNotes, codeacti, date_begin, date_end) => {
        everyNotes.forEach(element => {
            if (element.codeacti === codeacti) {
                let date1 = new Date(date_begin);
                let date2 = new Date(date_end);
                let dayDifference = ((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) + 1);
                const findAct = this.#xpAct.find((act) => act.name === 'Project' || act.alias.includes('Project'));
                findAct.nbPart += 1;
                if (this.dateIsPassed(date2)) {
                    const XP = (dayDifference * 2) * element.final_note / 100;
                    this.#me.nbXps += XP;
                    findAct.nbXPTotal += XP;
                    this.#me.activList.push({ title: element.title, type: "Project", status: 'present', date: date_begin, XPEarn: XP });
                } else {
                    const XP = (dayDifference * 2);
                    this.#me.nbXpsSoon += XP;
                    this.#me.activList.push({ title: element.title, type: "Project", status: 'present', date: date_begin, XPEarn: 0 });
                }
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
                if (nbPart < limitPart) {
                    this.#me.nbXps += xpWinPart;
                    findAct.nbXPTotal += xpWinPart;
                    findAct.nbPart += 1
                }
                this.#me.activList.push({ title, type, status: 'present', date, XPEarn: xpWinPart });
                break;
            case 'absent':
                this.#me.nbXps -= xpLostPart;
                findAct.nbXPTotal -= xpLostPart;
                this.#me.activList.push({ title, type, status: 'absent', date, XPEarn: xpLostPart * (-1) });
                break;
            case 'organisateur':
                if (nbOrg < limitOrg) {
                    this.#me.nbXps += xpWinOrg;
                    findAct.nbXPTotal += xpWinOrg;
                    findAct.nbOrg += 1;
                }
                this.#me.activList.push({ title, type, status: 'organisateur', date, XPEarn: xpWinOrg });
                break;
            case 'soon':
                this.#me.activList.push({ title, type, status: 'inscrit', date, XPEarn: 0 });
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
            nbPart <= limitPart && (this.#me.nbXpsSoon += xpWinPart) && findAct.nbPart++;
        });
    };

    getMeVariable = () => {
        return this.#me;
    }

    getnbXps = () => {
        return this.#me.nbXps;
    }

    getxpAct = () => {
        return this.#xpAct;
    }
}

export { XPHub };
