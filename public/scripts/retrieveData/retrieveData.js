import { getHighestTEpitech } from "./TEpitech.js";
import { updateFrontend } from "../updateFrontend.js";
import { updateRoadBlockInformation } from "./roadBlock.js";
import { getXPHubData } from "./XPHub.js";
import { updateTimelineChart } from "./timeline.js";

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

export async function retrieveData(XPHubApi, dataApi) {
    updateSideBarInformation(dataApi);
    updateDashboardInformation(dataApi);
    await getXPHubData(dataApi, XPHubApi);
    updateRoadBlockInformation(dataApi, XPHubApi);
    updateTimelineChart(dataApi);
}
