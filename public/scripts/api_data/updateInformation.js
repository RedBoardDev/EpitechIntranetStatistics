const sendUpdate = async (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

export const updateActiveTimeChart = async (api) => {
    const ActiveTimeData = (await api.getDataFromAPI(`user/${api.getUserEmail()}/netsoul?format=json`)).slice(-7);
    let myTotalWeekHour = 0;
    let averageTotalWeekHour = 0;

    for (const item of ActiveTimeData) {
        myTotalWeekHour += item[1] / 3600;
        averageTotalWeekHour += item[5] / 3600;
    }
    console.log("ActiveTimeData", ActiveTimeData, myTotalWeekHour, averageTotalWeekHour);
    sendUpdate('activeTimeChart-update', {
        _timeLogChart: ActiveTimeData,
        _myTotalWeekHour: myTotalWeekHour,
        _averageTotalWeekHour: averageTotalWeekHour
    });
}

export const updateUserInformation = async (api, generalUserData) => {
    const prenom = generalUserData['title'];
    const email = api.getUserEmail();
    const cursus = generalUserData['course_code'];
    const semester = generalUserData['semester_code'];
    const promo = 'Promotion ' + generalUserData['promo'];
    const profilPicture = ("https://intra.epitech.eu" + generalUserData['picture']);
    const city = "FeurLand";

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
    console.log("messageAndAlert", alert, message);
    sendUpdate('messageAndAlert-update', {
        _message: message,
        _alert: alert
    });
}
