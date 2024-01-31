import { updateFrontend } from "./updateFrontend.js";

function updateSideBarInformation(dataApi) {
    const generalUserData = dataApi.getGeneralUserData();
    if (!generalUserData) return;

    const data = {
        name: (generalUserData['title'] ?? ''),
        email: dataApi.getUserEmail(),
        cursus: (generalUserData['course_code'] ?? ''),
        semester: (generalUserData['semester_code'] ?? ''),
        promo: 'Promotion ' + (generalUserData['promo'] ?? ''),
        profilPicture: ("https://intra.epitech.eu" + (generalUserData['picture'] ?? '')),
        city: (generalUserData['groups'][0]?.['title'] ?? '')
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
        credits: (generalUserData['credits'] ?? 0),
        GPA: (generalUserData['gpa'][0]?.['gpa'] ?? 0.00),
        highestTEpitech: (getHighestTEpitech(dataApi))
    };
    updateFrontend('dashboard', data);
}

async function retrieveData(XPHubApi, dataApi) {
    updateSideBarInformation(dataApi);
    updateDashboardInformation(dataApi);
}

export { retrieveData };
