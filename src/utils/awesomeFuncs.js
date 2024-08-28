export const getFromLocalStorage = (key) => localStorage.getItem(key);
export const setToLocalStorage = (key, value) => localStorage.setItem(key, value);

export const exportTrackingData = () => {
    let currentTrackingData = {
        search_query: getFromLocalStorage("search_query"),
        shown_result: JSON.parse(getFromLocalStorage("shown_result")),
        items_viewed: JSON.parse(getFromLocalStorage("items_viewed"))
    };

    if (getFromLocalStorage("tracking_history") === null)  {
        setToLocalStorage("tracking_history", "[]");
    }

    let history = JSON.parse(getFromLocalStorage("tracking_history"));
    history.push(currentTrackingData);
    setToLocalStorage("tracking_history", JSON.stringify(history));

    // TODO: Update the tracked data to server
};

