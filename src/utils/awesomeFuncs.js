export const getFromLocalStorage = (key) => localStorage.getItem(key);
export const setToLocalStorage = (key, value) =>
  localStorage.setItem(key, value);

export const exportTrackingData = async () => {
  let currentTrackingData = {
    search_query: getFromLocalStorage("search_query"),
    shown_result: JSON.parse(getFromLocalStorage("shown_result")),
    items_viewed: JSON.parse(getFromLocalStorage("items_viewed")),
  };

  // TODO: remove isVisible while exporting the data

  let response = await fetch("https://acpproject021.pythonanywhere.com/api/store/", {
    method: "POST",

    body: JSON.stringify({
        user_id: getFromLocalStorage("user_id"),
        json_data: currentTrackingData
    })
  });
  response = await response.json();
  
  console.log(response);
};
