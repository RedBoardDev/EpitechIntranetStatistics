async function getModuleInformation(dataApi, codeInstance, codeSemester) { //check si on bien inscrit au module + roadblock + projet sinon mettre en gris dans le front
    // try {
        let nodeCompleteData = await dataApi.getNodeOnCourseCompleteData({ code: `${codeInstance}`, semester: Number(codeSemester) });
        if (nodeCompleteData === null) {
            return null;
        }
        if (nodeCompleteData === undefined) {
            const nodeInfo = await dataApi.getNodeOnCourseData({ code: `${codeInstance}`, semester: Number(codeSemester) });
            let nodeData;
            nodeData = nodeInfo.find((item) => item.status !== "notregistered") || nodeInfo[0];
            // if (nodeInfo.length > 1) {
            // } else
            //     nodeData = nodeInfo[0];

            nodeCompleteData = await dataApi.getCompleteDataFromApi(nodeData.code, nodeData.codeinstance);
            dataApi.setNodeCourseCompleteData({ code: codeInstance, semester: codeSemester }, nodeCompleteData);
        }
        if (!nodeCompleteData.error) {
            let moduleInfo = {
                name: `[${codeInstance}] ${nodeCompleteData?.['title'] ?? null}`,
                user_credits: nodeCompleteData?.['user_credits'] ?? null,
                credits: nodeCompleteData?.['credits'] ?? null,
                student_grade: nodeCompleteData?.['student_grade'] ?? null,
                student_credits: nodeCompleteData?.['student_credits'] ?? 0,
                color: nodeCompleteData?.['color'] ?? null
            };
            return moduleInfo;
        }
    // } catch (error) {
    //     console.log(error)
    // }
    return false;
}

export { getModuleInformation };
