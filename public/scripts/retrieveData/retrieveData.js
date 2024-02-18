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

async function updateCreditsInformation(epitechData, apiData, roadBlocksData) {
    const studentYear = apiData.getStudentYear();

    const availableCredits = roadBlocksData.reduce((sum, roadblock) => { // a voir si l'on peut pas optimiser ça et le faire dans roadblock directement. Pareil pour tout les reduce dans roadblockInformation() on peut surement le faire quand on traite le module pour optimiser
        return sum + roadblock.modules.reduce((moduleSum, module) => {
            const userCredits = parseInt(module.user_credits || 0);
            if (module.student_registered === 1 && module.student_grade === "N/A" && module.student_credits !== userCredits) {
                return moduleSum + userCredits;
            } else if (/B-INN-[0-9]00/.test(module.codeInstance) && module.student_grade !== "Acquis") {
                return moduleSum + epitechData.getHubMaxCredits(studentYear);
            } else {
                return moduleSum;
            }
        }, 0);
    }, 0);

    const data = {
        credits: apiData.getGeneralUserData()?.['credits'] ?? 0,
        neededCredits: epitechData.getCreditsRequirements(studentYear),
        availableCredits: availableCredits,
    };
    updateFrontend('credits', data);
}

export async function retrieveData(epitechData, XPHubData, apiData) {
    updateSideBarInformation(apiData);
    updateDashboardInformation(epitechData, apiData);
    await getXPHubData(epitechData, apiData, XPHubData);
    updateTimelineChart(apiData);
    const roadBlocksData = await updateRoadBlockInformation(epitechData, apiData, XPHubData);
    updateCreditsInformation(epitechData, apiData, roadBlocksData);
}
