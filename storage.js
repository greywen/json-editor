function getHistory() {
    const json = localStorage.getItem("history");
    const data = JSON.parse(json || "[]");
    return { data, count: data.length - 1 }
}

function getLastHistory(key) {
    const { data, count } = getHistory();
    let result = undefined;
    if (count >= 0) {
        const value = data[count][key]?.trim();
        if (value) result = value;
    }
    return result;
}

function setHistory(key, value) {
    let { data, count } = getHistory();
    if (count > 0) {
        data = [];
        data.push({ [key]: value });
    } else {
        data.splice(count, 1, { ...data[count], [key]: value });
    }
    localStorage.setItem('history', JSON.stringify(data));
}