"use client";

import Error from "@/components/Error";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
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

  if (loading === true) return <Loading />;
  if (error !== null) return <Error message={error} />;

  return (
    <>
      <Header />
      <div>
        {data.results.map((item) => {
          return <a href={`/item/${item.pid}`}>
            <div className="flex py-6 w-[60%] px-2 shadow-inner hover:shadow-slate-400 mb-5 hover:bg-slate-100  rounded-lg ml-10">
              <div>
                <img src={item.images[0]} alt={item.title} className="w-[180px] h-[100] py-5 px-6 hover:scale-110 duration-150 cursor-pointer rounded-sm" />
              </div>
              <div className="px-20  ">
                <h2 className="text-xl py-5  font-serif ">{item.title}</h2>
                <p className="text-lg cursor-pointer"> {item.pid}</p>
                <p className="text-lg py-5 hover:text-xl cursor-pointer">₹ {item.price}</p>
              </div>
            </div>
          </a>;
        })}
      </div>
      <div>

      </div>
    </>
  );
}
