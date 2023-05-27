const getMissingDates = (data) => {
    const dates = data.map(item => item[0]);
    const startDate = Math.min(...dates);
    const endDate = Math.max(...dates);
    const dateSet = new Set(dates);
    const missingDates = [];

    for (let date = startDate; date <= endDate; date += 86400) {
      if (!dateSet.has(date)) {
        missingDates.push(date);
      }
    }

    return missingDates;
  };

  const formatData = (data) => {
    return data.map(item => ({
      date: new Date(item[0] * 1000).toLocaleDateString(),
      activeTime: parseFloat((item[1] / 3600).toFixed(1)),
      averageTime: parseFloat((item[5] / 3600).toFixed(1)),
    }));
  };

  const addMissingDates = (data, missingDates) => {
    missingDates.forEach(date => {
      let formattedDate = new Date(date * 1000).toLocaleDateString();
      data.push({
          date: formattedDate,
          activeTime: 0,
          averageTime: 0,
      });
    });

    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    data.shift();

    return data;
  };

  export const formatDataWithMissingDates = (data) => {
    const missingDates = getMissingDates(data);
    let formattedData = formatData(data);
    return addMissingDates(formattedData, missingDates);
  };
