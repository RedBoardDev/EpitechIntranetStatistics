import { updateFrontend } from "../utils/updateFrontend.js";

export async function updateTimelineChart(apiData) {
    let timeLineData = {};
    const generalCourse = await apiData.getGeneralCourseData();
    const regexSkip = /^(B0|[A-Z]0)|.*Hub.*|.*Roadblock.*|.*Administrative.*|.*Internship.*|.*Hackathon.*/;
    for (let node of generalCourse) {
        if (node.status === "notregistered") {
            continue;
        }
        if (regexSkip.test(node.title)) {
            continue;
        }
        let nodeCompleteData;
        if (node.complete_data === undefined) {
            nodeCompleteData = await apiData.getCompleteDataFromApi(node.code, node.codeinstance);
            node.complete_data = nodeCompleteData;
        } else {
            nodeCompleteData = node.complete_data;
        }
        for (let activite of nodeCompleteData.activites) {
            if (activite.is_projet === true && activite.type_code === "proj" && (activite.type_title === "Mini-project" || activite.type_title === "Project")) {
                let nodeTitle = node.title.replace(/^[A-Za-z]\d+\s*-\s*/, '');
                if (!timeLineData[nodeTitle]) {
                    timeLineData[nodeTitle] = [];
                }
                timeLineData[nodeTitle].push({
                    title: activite.title,
                    begin: activite.begin,
                    end: activite.end,
                    end_register: activite.end_register
                });
            }
        }
    }
    updateFrontend('timeline', timeLineData);
};