export const getFromLocalStorage = (key) => localStorage.getItem(key);
export const setToLocalStorage = (key, value) =>
  localStorage.setItem(key, value);

export const exportTrackingData = async (invoker) => {
  let currentTrackingData = {
    search_query: getFromLocalStorage("search_query"),
    shown_result: JSON.parse(getFromLocalStorage("shown_result")),
    items_viewed: JSON.parse(getFromLocalStorage("items_viewed")),
  };

  return ;
  
  let nData = 7;
  let isActionMadeInPastNData = ((items_viewed) => {
    for (let item of items_viewed) {
      if (item[1].action !== "none") {
        setToLocalStorage("data_sent_condition", "true");
        return true;
      }
    }
    setToLocalStorage("data_sent_condition", "false");
    return false;
  })(currentTrackingData.items_viewed);

  let condition = currentTrackingData.items_viewed.length > nData || isActionMadeInPastNData;
  if (condition) {
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

    setToLocalStorage("data_sent", "true");
  }

  console.log(condition);

  setToLocalStorage("items_viewed", "[]");
};
