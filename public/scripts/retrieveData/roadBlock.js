import { creditPerStudentYear } from "../data/hubData.js";
import { modulesPerRoadBlock } from "../data/sortedModules.js";
import { getModuleInformation } from "../ModuleHandler.js";
import { updateFrontend } from "../updateFrontend.js";

export async function updateRoadBlockInformation(dataApi, XPHubApi) {
    const sortedModules = modulesPerRoadBlock;
    const roadBlockkeys = Object.keys(sortedModules);
    const studentYear = dataApi.getStudentYear();

    let roadBlocksList = [];

    for (const rdKey of roadBlockkeys) {
        const actualSemesterModules = await Promise.all(sortedModules[rdKey].modules.map(async codeInstance => {
            const semesterCodeMatch = codeInstance.match(/-(\d)/);
            if (!semesterCodeMatch || !semesterCodeMatch[1])
                return false;

            const semesterCode = semesterCodeMatch[1];
            let moduleInfo = await getModuleInformation(dataApi, codeInstance, semesterCode);
            if (moduleInfo === null || moduleInfo === undefined)
                return false;

            // hub module ?
            if (/B-INN-[0-9]00/.test(codeInstance)) {
                // moduleInfo.credits = (studentYear === 1) ? 5 : 8;
                moduleInfo.credits = creditPerStudentYear[studentYear] ?? 8;
                // moduleInfo.user_credits = (studentYear === 1) ? 5 : 8;
                moduleInfo.user_credits = creditPerStudentYear[studentYear] ?? 8;

                moduleInfo.user_credits = Math.floor((XPHubApi.getnbXps() / 10));
                if (moduleInfo.student_credits > moduleInfo.credits)
                    moduleInfo.student_credits = moduleInfo.credits;
                if (moduleInfo.student_credits >= moduleInfo.credits)
                    moduleInfo.color = 'green';
            }
            if (moduleInfo !== null && moduleInfo !== undefined)
                return moduleInfo;
            return false;
        }));

        const filteredModules = actualSemesterModules.filter(module => module !== false);

        roadBlocksList.push({
            type: rdKey,
            modules: filteredModules,
            total_roadblock_credits: filteredModules.reduce((sum, module) => {
                return sum + (module.credits || 0);
            }, 0),
            available_credits: filteredModules.reduce((sum, module) => {
                return sum + (parseInt(module.user_credits) || 0);
            }, 0),
            credit_needed: sortedModules[rdKey][`goal_tech${studentYear}`] || 0,
            actual_student_credits: filteredModules.reduce((sum, module) => {
                return sum + (module.student_credits || 0);
            }, 0)
        });
    }
    updateFrontend('roadblock', roadBlocksList);
}
