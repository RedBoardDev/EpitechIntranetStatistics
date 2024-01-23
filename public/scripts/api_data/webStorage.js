function storeData(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error('Error while storing data:', error);
        return false;
    }
}

function getData(key) {
    try {
        const storedData = localStorage.getItem(key);
        return storedData;
    } catch (error) {
        console.error('Error while retrieving data:', error);
        return null;
    }
}

export { getData, storeData };
