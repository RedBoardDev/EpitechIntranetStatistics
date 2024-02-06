function getHighestTEpitech(dataApi) {
    const generalNotesData = dataApi.getGeneralNotesData();
    var highestTEpitech = 0;

    const filteredTEPitech = generalNotesData['notes'].filter(element => {
        return element.title === "TEPitech" && (element.scolaryear).toString() === dataApi.getScolarYear()
    });

    filteredTEPitech.forEach(element => {
        highestTEpitech = (element.final_note > highestTEpitech ? element.final_note : highestTEpitech)
    });
    return highestTEpitech;
}

export { getHighestTEpitech };
