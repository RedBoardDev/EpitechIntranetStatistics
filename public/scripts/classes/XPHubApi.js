class XPHub {
    #xpAct;
    #me;

    constructor(activityData) {
        this.#me = { nbXps: 0, nbXpsSoon: 0, nbXpsLost: 0, activList: [] };
        this.#xpAct = activityData.map(activity => {
            return {
                ...activity,
                nbPart: 0,
                nbOrg: 0,
                nbXPTotal: 0,
            };
        });
    }

    dateIsPassed = (targetDate) => {
        const actualDate = new Date();
        return targetDate < actualDate;
    };

    addProject = (everyNotes, codeacti, date_begin, date_end) => {
        const projects = everyNotes.filter((note) => note.codeacti === codeacti);

        projects.forEach((project) => {
            const beginDate = new Date(date_begin);
            const endDate = new Date(date_end);

            const dateDifference = ((endDate.getTime() - beginDate.getTime()) / (1000 * 60 * 60 * 24) + 1);

            const findAct = this.#xpAct.find((act) => act.name === 'Project' || act.alias.includes('Project'));
            findAct.nbPart += 1;

            if (this.dateIsPassed(endDate)) {
                const XP = (dateDifference * 2) * project.final_note / 100;
                this.#me.nbXps += XP;
                findAct.nbXPTotal += XP;
                this.#me.activList.push({ title: project.title, type: "Project", status: 'present', date: date_begin, XPEarn: XP });
            } else {
                const XP = (dateDifference * 2);
                this.#me.nbXpsSoon += XP;
                this.#me.activList.push({ title: project.title, type: "Project", status: 'present', date: date_begin, XPEarn: 0 });
            }
        });
    };

    addActivite = (title, type, status, date) => {
        const findAct = this.#xpAct.find((act) => act.name === type || act.alias.includes(type));
        if (!findAct) return;
        const { limitPart, xpWinPart, xpWinOrg, nbPart, xpLostPart, nbOrg, limitOrg } = findAct;

        switch (status) {
            case 'present':
                if (limitPart === -1 || nbPart < limitPart) {
                    this.#me.nbXps += xpWinPart;
                    findAct.nbXPTotal += xpWinPart;
                    findAct.nbPart += 1
                }
                this.#me.activList.push({ title, type, status: 'present', date, XPEarn: xpWinPart });
                break;
            case 'absent':
                this.#me.nbXps -= xpLostPart;
                this.#me.nbXpsLost -= xpLostPart;
                findAct.nbXPTotal -= xpLostPart;
                this.#me.activList.push({ title, type, status: 'absent', date, XPEarn: xpLostPart * (-1) });
                break;
            case 'organisateur':
                if (limitOrg === -1 || nbOrg < limitOrg) {
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
        const registerActivity = (this.#me.activList).filter((act) => act.status === 'inscrit');
        registerActivity.map((act) => {
            const findAct = this.#xpAct.find((elem) => elem.name === act.type || elem.alias.includes(act.type));
            const { xpWinPart, limitPart, nbPart } = findAct;
            (limitPart === -1 || nbPart <= limitPart) && (this.#me.nbXpsSoon += xpWinPart) && findAct.nbPart++;
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
