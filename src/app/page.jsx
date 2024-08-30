"use client";

import Category from "@/components/Category";
import Header from "@/components/Header";
import { exportTrackingData, getFromLocalStorage, setToLocalStorage } from "@/utils/awesomeFuncs";
import { useFetch } from "@/utils/awesomeHooks";
import { useEffect } from "react";

export default function Home() {
  const [data, error, loading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/home_cache/`
  );

  useEffect(() => {
    async function setUpTrackingArea() {
      if (getFromLocalStorage("searching") === "true") {
        exportTrackingData("search_reset");
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

  console.log(Object.entries(data));

  return (
    <>
      <Header />
      {Object.entries(data).map(([categoryName, categoryData]) => <Category categoryName={categoryName} categoryData={categoryData} />)}
     
    </>
  );
}
