"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Category from "@/components/Category";
import Header from "@/components/Header";
import { exportTrackingData, getFromLocalStorage, setToLocalStorage } from "@/utils/awesomeFuncs";
import { useFetch } from "@/utils/awesomeHooks";
import { Suspense, useEffect } from "react";

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

  if (loading === true) return <Loading />;
  if (error !== null) return <Error message={error} />;

  return (
    <>
      <Suspense fallback={<Loading />}>
      <Header />
      <div className="space-y-5">
        {Object.entries(data).map(([categoryName, categoryData]) => <Category key={categoryName} categoryName={categoryName} categoryData={categoryData} />)}
      </div>
      </Suspense>
    </>
  );
}
