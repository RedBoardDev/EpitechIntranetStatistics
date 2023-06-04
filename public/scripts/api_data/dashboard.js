import { updateDashBoard } from "./updateInformation.js";

function isDateInCurrentWeek(dateStr, dayOfWeek) { // dayOfWeek is not a mandatory
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNumber = days.indexOf(dayOfWeek);

    var date = new Date(dateStr);
    var now = new Date();
    var startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (now.getDay() || 7) + 1);;
    var endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(23, 59, 59, 999);

    if (dayOfWeek !== undefined) {
        return date.getDay() === dayNumber && date >= startOfWeek && date <= endOfWeek;
    } else {
        return date >= startOfWeek && date <= endOfWeek;
    }
}

// function isDateInLastWeek(dateStr, dayOfWeek) { // dayOfWeek is not a mandatory
//     const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//     const dayNumber = days.indexOf(dayOfWeek);

//     var date = new Date(dateStr);
//     var now = new Date();
//     var startOfThisWeek = new Date(now.setDate(now.getDate() - now.getDay()));
//     var startOfLastWeek = new Date(startOfThisWeek.setDate(startOfThisWeek.getDate() - 6));
//     var endOfLastWeek = new Date(new Date(startOfLastWeek).setDate(startOfLastWeek.getDate() + 6));
//     startOfLastWeek.setHours(0, 0, 0, 0);
//     endOfLastWeek.setHours(23, 59, 59, 999);

//     if (dayOfWeek !== undefined) {
//         return date.getDay() === dayNumber && date >= startOfLastWeek && date <= endOfLastWeek;
//     } else {
//         return date >= startOfLastWeek && date <= endOfLastWeek;
//     }
// }

function getCurrentWeekLink() {
    var now = new Date();
    var startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (now.getDay() || 7) + 1);
    var endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    var startStr = startOfWeek.toISOString().slice(0, 10);
    var endStr = endOfWeek.toISOString().slice(0, 10);
    return 'planning/load?format=json&start=' + startStr + '&end=' + endStr;
}

const isProjectInProgressCurrentWeek = (project) => {
    const currentDate = new Date();
    const beginDate = new Date(project.begin);
    const endDate = new Date(project.end);

    return currentDate >= beginDate && currentDate <= endDate;
};

const checkDeadlineAtCurrentWeek = (project) => {
    return isDateInCurrentWeek(project.end);
};

const checkProjectInProgressAtCurrentWeek = (timeLineData) => {
    let projectInProgress = [];
    for (const key in timeLineData) {
        const projects = timeLineData[key];
        for (const project of projects) {
            const isInProgress = isProjectInProgressCurrentWeek(project);
            if (isInProgress) {
                project.deadLineThisWeek = checkDeadlineAtCurrentWeek(project); // TODO
                projectInProgress.push(project);
            }
        }
    }
    return projectInProgress;
};

// a bouger
const roadBlockData = `
  {
    "Technical foundation": {
      "modules": [
        "B-CPE-100",
        "B-CPE-101",
        "B-CPE-110",
        "B-CPE-111",
        "B-CPE-200",
        "B-CPE-201",
        "B-CPP-300",
        "B-CCP-400",
        "B-CPP-500",
        "B-CPP-501",
        "B-CPP-510",
        "B-PSU-100",
        "B-PSU-101",
        "B-PSU-200",
        "B-PSU-210",
        "B-MET-100",
        "B-MET-200",
        "B-MET-400",
        "B-NWP-400",
        "B-YEP-400",
        "B-YEP-410",
        "B-OOP-400",
        "B-DEV-500",
        "B-DEV-501",
        "B-DEV-510",
        "B-FUN-500",
        "B-FUN-501",
        "B-FUN-510",
        "B-SYN-200",
        "B-SYN-400",
        "B-YEP-500",
        "B-PDG-300"
      ],
      "goal_tech1": 20,
      "goal_tech2": 13,
      "goal_tech3": 8
    },
    "Technical supplement": {
      "modules": [
        "B-MUL-100",
        "B-MUL-200",
        "B-MAT-100",
        "B-MAT-200",
        "B-MAT-400",
        "B-MAT-500",
        "B-AIA-200",
        "B-AIA-500",
        "B-SAD-200",
        "B-WEB-200",
        "B-NSA-100",
        "B-NSA-400",
        "B-NSA-500",
        "B-SHL-300",
        "B-FUN-300",
        "B-SHL-400",
        "B-ASM-400",
        "B-FUN-400",
        "B-PSU-402",
        "B-CNA-410",
        "B-DOP-200",
        "B-DOP-400",
        "B-DOP-500",
        "B-SEC-200",
        "B-SEC-400",
        "B-SEC-500",
        "B-SYN-200",
        "B-SYN-400",
        "B-PSU-400"
      ],
      "goal_tech1": 8,
      "goal_tech2": 6,
      "goal_tech3": 2
    },
    "HUB - Innovation": {
      "modules": [
        "G-JAM-001",
        "B-INN-010",
        "B-INN-200",
        "B-INN-400",
        "B-INN-500",
        "G-CUS-001",
        "G-CUS-002",
        "G-CUS-003",
        "G-CUS-004",
        "G-CUS-005",
        "G-CUS-006",
        "G-CUS-007",
        "G-CUS-008",
        "B-EIP-500",
        "B-MOO-500",
        "B-MOO-501",
        "B-MOO-502",
        "B-PRO-500",
        "G-EPI-010"
      ],
      "goal_tech1": 3,
      "goal_tech2": 4,
      "goal_tech3": 13
    },
    "Soft skills": {
      "modules": [
        "G-FRE-010",
        "B-PCP-000",
        "B-FRE-100",
        "B-FRE-200",
        "B-FRE-400",
        "B-FRE-501",
        "B-FLE-100",
        "B-FLE-200",
        "B-FLE-400",
        "B-FLE-500",
        "B-SPA-100",
        "B-PRO-120",
        "B-PRO-220",
        "B-PRO-420",
        "B-GER-001",
        "B-FRE-010",
        "B-PRO-100",
        "B-PRO-510",
        "B-PRO-400",
        "B-PMP-400",
        "B-PCP-400"
      ],
      "goal_tech1": 3,
      "goal_tech2": 3,
      "goal_tech3": 3
    }
  }
`;

function checkModuleCode(moduleCode) {
    const data = JSON.parse(roadBlockData);
    for (const category in data) {
        const modules = data[category].modules;
        if (modules.includes(moduleCode)) {
            return true;
        }
    }
    return false;
};

const checkActivitiesAtCurrentWeek = async (api) => {
    let activitesAtCurrentWeek = [];
    const link = getCurrentWeekLink();
    console.log(link);
    const rsp = await api.getDataFromAPI(link);
    for (let key in rsp) {
        if ((rsp[key]['type_title'] !== "Follow-up" && rsp[key]['type_title'] !== 'Defense' && rsp[key]['type_title'] !== 'Review' && rsp[key]['type_title'] !== 'Delivery' && rsp[key]['type_title'] !== 'Keynote') ||
            rsp[key]['module_available'] === false ||
            rsp[key]['past'] === true ||
            rsp[key]['module_registered'] === false ||
            checkModuleCode(rsp[key]['codemodule']) === false) {
            continue;
        }
        if (rsp[key]['event_registered'] === false) {
            console.log("inscrit au module mais pas a cette activité !! alerte");
        }
        activitesAtCurrentWeek.push(rsp[key]);
    }
    return activitesAtCurrentWeek;
};

export const dashboardScript = async (api, timeLineData) => {
    const projectInProgress = checkProjectInProgressAtCurrentWeek(timeLineData);
    const activitesAtCurrentWeek = await checkActivitiesAtCurrentWeek(api);
    updateDashBoard(projectInProgress, activitesAtCurrentWeek);
};
