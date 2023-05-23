const sendUpdate = async (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

export const updateActiveTimeChart = async (api) => {
    const totalDayActiveTime = (await api.getDataFromAPI(`user/${api.getUserEmail()}/netsoul?format=json`));
    const last14DayActiveTime = (totalDayActiveTime.slice(-14)).slice(7);
    const last7DayActiveTime = totalDayActiveTime.slice(-7);
    let mytotalYearHour = 0;
    let averageTotalYearHour = 0;
    let myTotalActualWeekHour = 0;
    let averageTotalActualWeekHour = 0;
    let myTotalLastWeekHour = 0;
    let averageTotalLastWeekHour = 0;

    for (const item of totalDayActiveTime) {
        mytotalYearHour += item[1] / 3600;
        averageTotalYearHour += item[5] / 3600;
    }
    for (const item of last14DayActiveTime) {
        myTotalLastWeekHour += item[1] / 3600;
        averageTotalLastWeekHour += item[5] / 3600;
    }
    for (const item of last7DayActiveTime) {
        myTotalActualWeekHour += item[1] / 3600;
        averageTotalActualWeekHour += item[5] / 3600;
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
    console.log("highestTEpitech", highestTEpitech);

    sendUpdate('importantDataCard-update', {
        _credits: credits,
        _GPA: GPA,
        _highestTEpitech: highestTEpitech
    });
}

export const updateXPHubInformation = async (meXPHubVar) => {
    console.log("meXPHubVar",meXPHubVar);
    sendUpdate('xpHub-update', {
        _meXPHubVar: meXPHubVar,
    });
}

export const updateRoadBlockInformation = async (roadBlocksList) => {
    console.log("roadBlocksList", roadBlocksList);
    sendUpdate('roadBlock-update', {
        _roadBlocksList: roadBlocksList,
    });
}

export const updateTimeLineData = async (timeLineData) => {
    console.log("timeLineData", timeLineData);
    sendUpdate('timeLine-update', {
        _timeLineData: timeLineData,
    });
}

export const updateMessageAndAlert = async (api) => {
    const alert = await api.getDataFromAPI(`user/${api.getUserEmail()}/notification/alert?format=json`);
    const message = await api.getDataFromAPI(`user/${api.getUserEmail()}/notification/message?format=json`);
    console.log("messageAndAlert", alert);
    console.log("messageAndAlert", message);
    sendUpdate('messageAndAlert-update', {
        _message: message,
        _alert: alert
    });
}
