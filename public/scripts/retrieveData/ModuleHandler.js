async function getModuleInformation(apiData, codeInstance, codeSemester) { //check si on bien inscrit au module + roadblock + projet sinon mettre en gris dans le front
    try {
        let nodeCompleteData = await apiData.getNodeOnCourseCompleteData({ code: `${codeInstance}`, semester: Number(codeSemester) });
        if (nodeCompleteData === null) {
            return null;
        }
        if (nodeCompleteData === undefined) {
            const nodeInfo = await apiData.getNodeOnCourseData({ code: `${codeInstance}`, semester: Number(codeSemester) });
            let nodeData;
            nodeData = nodeInfo.find((item) => item.status !== "notregistered") || nodeInfo[0];
            nodeCompleteData = await apiData.getCompleteDataFromApi(nodeData.code, nodeData.codeinstance);
            apiData.setNodeCourseCompleteData({ code: codeInstance, semester: codeSemester }, nodeCompleteData);
        }
        if (!nodeCompleteData.error) {
            let moduleInfo = {
                name: `${nodeCompleteData?.['title'] ?? null}`,
                codeInstance: codeInstance,
                user_credits: nodeCompleteData?.['user_credits'] ?? null,
                credits: nodeCompleteData?.['credits'] ?? null,
                student_registered: nodeCompleteData?.['student_registered'] ?? 0,
                student_grade: nodeCompleteData?.['student_grade'] ?? null,
                student_credits: nodeCompleteData?.['student_credits'] ?? 0,
                color: nodeCompleteData?.['color'] ?? null
            };
            return moduleInfo;
        }
    } catch (error) {
        return false;
    }
    return false;
}

export { getModuleInformation };
