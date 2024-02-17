import { getHighestTEpitech } from "./TEpitech.js";
import { updateFrontend } from "../utils/updateFrontend.js";
import { updateRoadBlockInformation } from "./roadBlock.js";
import { getXPHubData } from "./XPHub.js";
import { updateTimelineChart } from "./timeline.js";

function updateSideBarInformation(apiData) {
    const generalUserData = apiData.getGeneralUserData();
    if (!generalUserData) return;

    const data = {
        name: (generalUserData['title'] ?? ''),
        email: apiData.getUserEmail(),
        cursus: (generalUserData['course_code'] ?? ''),
        semester: (generalUserData['semester_code'] ?? ''),
        promo: 'Promotion ' + (generalUserData['promo'] ?? ''),
        profilPicture: ("https://intra.epitech.eu" + (generalUserData['picture'] ?? '')),
        city: (generalUserData['groups'][0]?.['title'] ?? ''),
    };

    updateFrontend('sidebar', data);
}

async function updateDashboardInformation(epitechData, apiData) {
    const generalUserData = apiData.getGeneralUserData();
    if (!generalUserData) return;

    const data = {
        credits: (generalUserData['credits'] ?? 0),
        GPA: (generalUserData['gpa'][0]?.['gpa'] ?? 0.00),
        highestTEpitech: (getHighestTEpitech(apiData)),
        goalTEpitech: epitechData.getRoadblocksRequirementsByType(apiData.getStudentYear(), 'tepitech'),
    };
    updateFrontend('dashboard', data);
}

export async function retrieveData(epitechData, XPHubData, apiData) {
    updateSideBarInformation(apiData);
    updateDashboardInformation(epitechData, apiData);
    await getXPHubData(epitechData, apiData, XPHubData);
    updateRoadBlockInformation(epitechData, apiData, XPHubData); // update using EpitechData class
    updateTimelineChart(apiData);
}
