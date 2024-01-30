import { updateFrontend } from "./updateFrontend.js";

function updateSideBarInformation(dataApi) {
    const generalUserData = dataApi.getGeneralUserData();
    if (!generalUserData) return;

    const data = {
        _prenom: (generalUserData['title'] ?? ''),
        _email: dataApi.getUserEmail(),
        _cursus: (generalUserData['course_code'] ?? ''),
        _semester: (generalUserData['semester_code'] ?? ''),
        _promo: 'Promotion ' + (generalUserData['promo'] ?? ''),
        _profilPicture: ("https://intra.epitech.eu" + (generalUserData['picture'] ?? '')),
        _city: (generalUserData['groups'][0]?.['title'] ?? '')
    };

    updateFrontend('sidebar', data);
}

function getHighestTEpitech(dataApi) {
    const generalNotesData = dataApi.getGeneralNotesData();
    var highestTEpitech = 0;

    const filteredTEPitech = generalNotesData['notes'].filter(element => {
        return element.title === "TEPitech" && (element.scolaryear).toString() === dataApi.getScolarYear()
    });

    filteredTEPitech.forEach(element => {
        highestTEpitech = (element.final_note > highestTEpitech ? element.final_note : highestTEpitech)
    });
    return highestTEpitech;
}

async function updateDashboardInformation(dataApi) {
    const generalUserData = dataApi.getGeneralUserData();
    if (!generalUserData) return;

    const data = {
        _credits: (generalUserData['credits'] ?? 0),
        _GPA: (generalUserData['gpa'][0]?.['gpa'] ?? 0.00),
        _highestTEpitech: (getHighestTEpitech(dataApi))
    };
    updateFrontend('dashboard', data);
}

async function retrieveData(XPHubApi, dataApi) {
    updateSideBarInformation(dataApi);
    updateDashboardInformation(dataApi);
}

export { retrieveData };
