export const getFromLocalStorage = (key) => localStorage.getItem(key);
export const setToLocalStorage = (key, value) =>
  localStorage.setItem(key, value);

export const exportTrackingData = async (invoker) => {
  let currentTrackingData = {
    search_query: getFromLocalStorage("search_query"),
    shown_result: JSON.parse(getFromLocalStorage("shown_result")),
    items_viewed: JSON.parse(getFromLocalStorage("items_viewed")),
  };

  if (getFromLocalStorage("tracking_history") === null) {
    setToLocalStorage("tracking_history", "[]");
  }

  let history = JSON.parse(getFromLocalStorage("tracking_history"));
  history.push(currentTrackingData);
  setToLocalStorage("tracking_history", JSON.stringify(history));

  // TODO: remove isVisible while exporting the data
  return;
  let response = await fetch(
    "https://acpproject021.pythonanywhere.com/api/store/",
    {
      method: "POST",

      body: JSON.stringify({
        user_id: getFromLocalStorage("user_id"),
        json_data: currentTrackingData,
      }),
    }
  );
  response = await response.json();

  console.log(response);
};
