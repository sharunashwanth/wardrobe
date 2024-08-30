"use client";

import ChatbotSearch from "@/components/ChatbotSearch";
import Error from "@/components/Error";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  exportTrackingData,
  getFromLocalStorage,
  setToLocalStorage,
  toggleElementInArray,
} from "@/utils/awesomeFuncs";
import { useFetch, useSearchParamsObject } from "@/utils/awesomeHooks";
import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FcOk } from "react-icons/fc";

const SelectSearchItem = ({ selectedItems, setSelectedItems, pid }) => {
  const [selected, setSelected] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();

    let items = toggleElementInArray(selectedItems, pid);
    setSelectedItems(items);
    setSelected(!selected);
  }
  
  return <div onClick={handleClick} className={`absolute text-3xl rounded-full -right-2 -top-2 group-hover:block hover:scale-125 cursor-pointer ${selected ? "" : "hover:bg-orange-100 hidden"}`}>
    {selected ? <FcOk /> : <CiCirclePlus />}
  </div>
}

export default function SearchPage() {
  const searchParams = useSearchParamsObject();

  if (!searchParams.query) {
    return <p>`query` param is required*</p>;
  }

  const searchQuery = searchParams.query;

  const [data, error, loading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/search/?query=${searchQuery}`
  );

  const [selectedItems, setSelectedItems] = useState([]);

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

  if (data) {
    setToLocalStorage("shown_results", JSON.stringify(data.results.map(r => r.pid)));
  }
  
  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-[60%] h-[85vh] left-0 overflow-scroll no-scroll px-6">
          <h2 className="pb-6 px-2 text-xl">Showing results for '{searchQuery}'</h2>
          {data.results.map((item) => {
            return <a href={`/item/${item.pid}`} className="group relative" key={item.pid}>
              <div className="flex py-6 shadow-inner hover:shadow-slate-400 mb-5 hover:bg-slate-100 rounded-lg">
                <div>
                  <img src={item.images[0]} alt={item.title} className="w-[180px] aspect-square object-contain h-[100] py-5 px-6 hover:scale-110 duration-150 cursor-pointer rounded-sm" />
                </div>
                <div className="px-20">
                  <h2 className="text-xl py-5  font-serif ">{item.title}</h2>
                  <p className="text-lg cursor-pointer"> {item.pid}</p>
                  <p className="text-lg py-5 cursor-pointer">₹ {item.price}</p>
                </div>
                <SelectSearchItem selectedItems={selectedItems} setSelectedItems={setSelectedItems} pid={item.pid} />
              </div>
            </a>;
          })}
        </div>
        <div className="w-[40%] h-[85vh] right-0 overflow-scroll no-scroll">
          <ChatbotSearch selectedItems={selectedItems} searchResults={data} />
        </div>
      </div>
    </>
  );
}
