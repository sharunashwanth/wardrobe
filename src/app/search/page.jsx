"use client";

import {
  exportTrackingData,
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/awesomeFuncs";
import { useFetch, useSearchParamsObject } from "@/utils/awesomeHooks";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function SearchPage() {
  const pathname = usePathname();
  const searchParams = useSearchParamsObject();

  console.log(pathname, searchParams);

  if (!searchParams.query) {
    return <p>`query` param is required*</p>;
  }

  const searchQuery = searchParams.query;

  const [data, error, loading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/search/?query=${searchQuery}`
  );

  useEffect(() => {
    async function setUpTrackingArea() {
      if (getFromLocalStorage("searching") === "true") {
        if (getFromLocalStorage("search_query") === searchQuery) return;
        exportTrackingData("search_changed");
      }

      setToLocalStorage("searching", "true");

      setToLocalStorage("search_query", searchQuery);
      setToLocalStorage("items_viewed", "[]");
      setToLocalStorage("shown_results", "[]");
    }

    setUpTrackingArea();
  }, []);

  return (
    <>
      <div>Header</div>
      <div>Chatbot</div>

      <p>Hello Mom</p>

      <div>Footer</div>
    </>
  );
}
