import { formatDataWithMissingDates } from './activeTimeFct.js';

const sendUpdate = async (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

export const updateActiveTimeChart = async (api) => {
    const totalDayActiveTime = (await api.getDataFromAPI(`user/${api.getUserEmail()}/netsoul?format=json`));
    const lastWeekActiveTime = formatDataWithMissingDates(totalDayActiveTime.slice(-13, -6));
    const last7DayActiveTime = formatDataWithMissingDates(totalDayActiveTime.slice(-7));
    let mytotalYearHour = 0;
    let averageTotalYearHour = 0;
    let myTotalActualWeekHour = 0;
    let averageTotalActualWeekHour = 0;
    let myTotalLastWeekHour = 0;
    let averageTotalLastWeekHour = 0;

    const now = new Date();
    const currentDayOfWeek = now.getDay();
    const adjustedDayOfWeek = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;

    // Set the current week start and end dates
    const currentWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - adjustedDayOfWeek + 1);
    const currentWeekEnd = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + 6);

    // Set the last week start and end dates
    // const lastWeekStart = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() - 7);
    // const lastWeekEnd = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() - 1);

    for (const item of totalDayActiveTime) {
        mytotalYearHour += item[1] / 3600;
        averageTotalYearHour += item[5] / 3600;
    }

    for (const item of lastWeekActiveTime) {
        // const itemDate = new Date(item.date);
        // if (itemDate >= lastWeekStart && itemDate <= lastWeekEnd) {
            myTotalLastWeekHour += item.activeTime;
            averageTotalLastWeekHour += item.averageTime;
        // }
    }

    for (const item of last7DayActiveTime) {
        const itemDate = new Date(item.date);
        if (itemDate >= currentWeekStart && itemDate <= currentWeekEnd) {
            myTotalActualWeekHour += item.activeTime;
            averageTotalActualWeekHour += item.averageTime;
        }
    }

    sendUpdate('activeTimeChart-update', {
        _last7DayActiveTime: last7DayActiveTime,
        _myTotalActualWeekHour: myTotalActualWeekHour,
        _averageTotalActualWeekHour: averageTotalActualWeekHour,
        _mytotalYearHour: mytotalYearHour,
        _averageTotalYearHour: averageTotalYearHour,
        _myTotalLastWeekHour: myTotalLastWeekHour,
        _averageTotalLastWeekHour: averageTotalLastWeekHour
    });
}


export const updateUserInformation = async (api, generalUserData) => {
    const prenom = generalUserData['title'];
    const email = api.getUserEmail();
    const cursus = generalUserData['course_code'];
    const semester = generalUserData['semester_code'];
    const promo = 'Promotion ' + generalUserData['promo'];
    const profilPicture = ("https://intra.epitech.eu" + generalUserData['picture']);
    const city = generalUserData['groups'][0]['title'];
    sendUpdate('sidebar-update', {
        _prenom: prenom,
        _email: email,
        _cursus: cursus,
        _semester: semester,
        _promo: promo,
        _profilPicture: profilPicture,
        _city: city
    });
}

export const updateImportantDataCard = async (api, generalUserData, generalNotesData) => {
    const credits = generalUserData['credits'];
    const GPA = generalUserData['gpa'][0]['gpa'];
    const highestTEpitech = await api.getHighestTEpitech(generalNotesData);

    sendUpdate('importantDataCard-update', {
        _credits: credits,
        _GPA: GPA,
        _highestTEpitech: highestTEpitech
    });
}

export const updateXPHubInformation = async (XPHub_me, XPHub_xpAct) => {
    sendUpdate('xpHub-update', {
        _XPHub_me: XPHub_me,
        _XPHub_xpAct: XPHub_xpAct
    });
}

export const updateRoadBlockInformation = async (roadBlocksList) => {
    sendUpdate('roadBlock-update', {
        _roadBlocksList: roadBlocksList,
    });
}

export const updateTimeLineData = async (timeLineData) => {
    sendUpdate('timeLine-update', {
        _timeLineData: timeLineData,
    });
}

export const updateMessageAndAlert = async (api) => {
    const alert = await api.getDataFromAPI(`user/${api.getUserEmail()}/notification/alert?format=json`);
    const message = await api.getDataFromAPI(`user/${api.getUserEmail()}/notification/message?format=json`);
    sendUpdate('messageAndAlert-update', {
        _message: message,
        _alert: (alert === undefined || alert.length > 0 ? alert : undefined)
    });
}

export const updateDashBoard = async (projectInProgress, activitesAtCurrentWeek) => {
    sendUpdate('dashboard-update', {
        _projectInProgress: projectInProgress,
        _activitesAtCurrentWeek: activitesAtCurrentWeek
    });
}
