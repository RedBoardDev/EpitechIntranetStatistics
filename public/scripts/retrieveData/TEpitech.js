function getHighestTEpitech(dataApi) {
    const generalNotesData = dataApi.getGeneralNotesData();
    var highestTEpitech = 0;

    const regex = /TEPitech(?!.*Self-assessment)/;
    const filteredTEPitech = generalNotesData['notes'].filter(element => {
        return element.codemodule === 'B-ANG-058' && regex.test(element.title) && (element.scolaryear).toString() === dataApi.getScolarYear()
    });

    const bestTEPitechElement = filteredTEPitech.find(element => element.title === "Best TEPitech score of the year");
    if (bestTEPitechElement) return bestTEPitechElement.final_note;

    filteredTEPitech.forEach(element => {
        highestTEpitech = (element.final_note > highestTEpitech ? element.final_note : highestTEpitech)
    });
    return highestTEpitech;
}

export { getHighestTEpitech };
