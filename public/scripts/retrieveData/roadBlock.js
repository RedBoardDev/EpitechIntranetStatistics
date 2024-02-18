import { getModuleInformation } from "./ModuleHandler.js";
import { updateFrontend } from "../utils/updateFrontend.js";

function hubUnitInformation(epitechData, XPHubData, studentYear, moduleInfo) {
    let newModuleInfo = moduleInfo;

    newModuleInfo.credits = epitechData.getHubMaxCredits(studentYear);
    newModuleInfo.student_credits = Math.floor((XPHubData.getnbXps() / 10));

    if (newModuleInfo.user_credits > newModuleInfo.credits)
        newModuleInfo.user_credits = newModuleInfo.credits;
    if (newModuleInfo.user_credits >= newModuleInfo.credits)
        newModuleInfo.color = 'green';

    return newModuleInfo;
}

async function getUnitInformation(epitechData, apiData, XPHubData, studentYear, unitCode) {
    const semesterCodeMatch = unitCode.match(/-(\d)/);
    if (!semesterCodeMatch || !semesterCodeMatch[1]) return null;

    const moduleInfo = await getModuleInformation(apiData, unitCode, semesterCodeMatch[1]);
    if (!moduleInfo) return null;

    if (/B-INN-[0-9]00/.test(unitCode)) { // HUB UNIT
        return hubUnitInformation(epitechData, XPHubData, studentYear, moduleInfo);
    } else {
        return moduleInfo;
    }
}

function roadblockInformation(unitsData, rdKey, rdName, creditNeeded) {
    const roadblockData = {
        key: rdKey,
        name: rdName,
        modules: unitsData,
        total_roadblock_credits: unitsData.reduce((sum, module) => {
            return sum + (module.credits || 0);
        }, 0),
        available_credits: unitsData.reduce((sum, module) => {
            return sum + (parseInt(module.user_credits) || 0);
        }, 0),
        credit_needed: creditNeeded,
        actual_student_credits: unitsData.reduce((sum, module) => {
            return sum + (module.student_credits || 0);
        }, 0)
    };
    return roadblockData;
}

export async function updateRoadBlockInformation(epitechData, apiData, XPHubData) {
    const roadblocksNames = epitechData.getRoadblocksNames();
    const roadblocksKey = Object.keys(roadblocksNames);
    const studentYear = apiData.getStudentYear();

    let roadBlocksData = [];

    for (const rdKey of roadblocksKey) {
        const unitsCode = epitechData.getUnitsByType(studentYear, rdKey);
        let unitsData = [];
        for (const unitCode of unitsCode) {
            const unitData = await getUnitInformation(epitechData, apiData, XPHubData, studentYear, unitCode);
            if (!unitData) continue;
            unitsData.push(unitData);
        }
        const creditNeeded = epitechData.getRoadblocksRequirementsByType(studentYear, rdKey);
        const roadblockData = roadblockInformation(unitsData, rdKey, roadblocksNames[rdKey], creditNeeded);
        if (roadblockData.key !== 'professional_writings') // do not show professional_writings
            roadBlocksData.push(roadblockData);
    }
    updateFrontend("roadblocks", roadBlocksData);
}
