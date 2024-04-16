import { getHighestTEpitech, getTEpitechStatistics } from "./TEpitech.js";
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

async function updateTepitechInformation(apiData) {
    const generalUserData = apiData.getGeneralUserData();
    if (!generalUserData) return;

    updateFrontend('tepitechs', getTEpitechStatistics(apiData));
}

async function updateCreditsInformation(epitechData, apiData) {
    const studentYear = apiData.getStudentYear();

    const credits = apiData.getGeneralUserData()?.['credits'] ?? 0;
    const creditsRequirement = epitechData.getCreditsRequirements(studentYear) ?? 0;
    const current = await apiData.getCurrent();

    if (!current || current.length < 1) return;
    const availableCredits = current.reduce((sum, module) => {
        if (module.grade === '-')
            return sum + (parseInt(module.credits) || 0);
        return sum;
    }, 0) + epitechData.getHubMaxCredits(studentYear);

    const data = {
        credits: credits,
        neededCredits: creditsRequirement,
        availableCredits: availableCredits,
        status: ((credits >= creditsRequirement) ? 'requirement_met' : ((credits + availableCredits >= creditsRequirement) ? 'requirement_attainable' : 'credits_below_requirement')),
    };
    updateFrontend('credits_requirement', data);
}

async function fetchManifestJson() {
    const response = await fetch('/manifest.json');
    if (!response.ok) return 'null';
    return await response.json();
}

async function updateDevelopperInformation(epitechData) {
    const manifestJson = await fetchManifestJson();
    const data = {
        currentVersion: manifestJson.version,
        dataLastUpdate: epitechData.getUpdateDate(),
    };
    updateFrontend('developper', data);
}

export async function retrieveData(epitechData, XPHubData, apiData) {
    updateDevelopperInformation(epitechData);
    updateSideBarInformation(apiData);
    updateDashboardInformation(epitechData, apiData);
    updateTepitechInformation(apiData);
    await getXPHubData(epitechData, apiData, XPHubData);
    updateTimelineChart(apiData);
    updateRoadBlockInformation(epitechData, apiData, XPHubData);
    updateCreditsInformation(epitechData, apiData);
}
