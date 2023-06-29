import { roadBlockData } from "./roadBlockData.js"
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
                project.deadLineThisWeek = checkDeadlineAtCurrentWeek(project);
                projectInProgress.push(project);
            }
        }
    }
    return projectInProgress;
};

function checkModuleCode(moduleCode) {
    const data = roadBlockData;
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
