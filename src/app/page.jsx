"use client";

import { exportTrackingData, getFromLocalStorage, setToLocalStorage } from "@/utils/awesomeFuncs";
import { useFetch } from "@/utils/awesomeHooks";
import { useEffect } from "react";

export default function Home() {
  const [data, error, loading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/home/`
  );

  useEffect(() => {
    async function setUpTrackingArea() {
      if (getFromLocalStorage("searching") === "true") {
        exportTrackingData();
      }

      setToLocalStorage("searching", "false");

      localStorage.removeItem("search_query");
      localStorage.removeItem("items_viewed");
      localStorage.removeItem("shown_results");
    }

    setUpTrackingArea();
  }, []);
  
  if (loading === true) return <p>Loading</p>;

  if (error !== null) return <p>Error</p>;

  console.log(data.products);

  return (
    <>
      <p>Products</p>
    </>
  );
}
