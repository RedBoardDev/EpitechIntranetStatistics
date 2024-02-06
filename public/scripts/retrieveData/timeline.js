export const updateTimelineChart = async (dataApi) => {
    let timeLineData = {};
    const generalCourse = await dataApi.getGeneralCourseData();
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
            nodeCompleteData = await dataApi.getCompleteDataFromApi(node.code, node.codeinstance);
            node.complete_data = nodeCompleteData;
        } else {
            nodeCompleteData = node.complete_data;
        }
        for (let activite of nodeCompleteData.activites) {
            if (activite.is_projet === true && activite.type_code === "proj" && (activite.type_title === "Mini-project" || activite.type_title === "Project")) {
                if (!timeLineData[node.title]) {
                    timeLineData[node.title] = [];
                }
                timeLineData[node.title].push({
                    title: activite.title,
                    begin: activite.begin,
                    end: activite.end,
                    end_register: activite.end_register
                });
            }
        }
    }
    console.log("timeLineData", timeLineData);
    // updateTimeLineData(timeLineData);
};