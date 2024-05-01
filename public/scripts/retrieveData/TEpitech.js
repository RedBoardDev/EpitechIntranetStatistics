function getFilteredTEPitech(dataApi, regex, notes) {
    return notes.filter(element => {
        return element.codemodule === 'B-ANG-058' && regex.test(element.title) && (element.scolaryear).toString() === dataApi.getScolarYear()
    });
}

function getHighestTEpitech(dataApi) {
    const generalNotesData = dataApi.getGeneralNotesData();
    var highestTEpitech = 0;

    const regex = /TEPitech(?!.*Self-assessment)/;
    const filteredTEPitech = getFilteredTEPitech(dataApi, regex, generalNotesData['notes']);

    const bestTEPitechElement = filteredTEPitech.find(element => element.title === "Best TEPitech score of the year");
    if (bestTEPitechElement) return bestTEPitechElement.final_note;

    filteredTEPitech.forEach(element => {
        highestTEpitech = (element.final_note > highestTEpitech ? element.final_note : highestTEpitech)
    });
    return highestTEpitech;
}

function extractSectionsAndScores(comment) {
    const regex = /([\w&]+(?: \w+)*):(\d+)\/(\d+)/g;
    const sectionsAndScores = {};
    let match;

    while ((match = regex.exec(comment)) !== null) {
        const section = match[1].trim().toLowerCase();
        const score = match[2] ? parseInt(match[2], 10) : null;
        const total = match[3] ? parseInt(match[3], 10) : null;
        sectionsAndScores[section] = { score, total };
    }
    return sectionsAndScores;
}

function getTEpitechStatistics(dataApi) {
    const generalNotesData = dataApi.getGeneralNotesData();

    const regex = /TEPitech/;
    const filteredTEPitech = getFilteredTEPitech(dataApi, regex, generalNotesData['notes']);

    return filteredTEPitech.map(node => {
        return {
            date: node.date ?? null,
            final_note: node.final_note ?? 0,
            sections: (extractSectionsAndScores(node.comment) ?? null),
        };
    });
}

export { getHighestTEpitech, getTEpitechStatistics };
