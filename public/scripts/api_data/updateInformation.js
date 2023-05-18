const sendUpdate = async (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

export const updateActiveTimeChart = async (api) => {
    const ActiveTimeData = (await api.getDataFromAPI(`user/${api.getUserEmail()}/netsoul?format=json`)).slice(-7);
    sendUpdate('activeTime-update', {
        _ActiveTimeData: ActiveTimeData,
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
