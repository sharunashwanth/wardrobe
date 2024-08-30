"use client";

import Items from "@/components/Items";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/awesomeFuncs";
import { useFetch } from "@/utils/awesomeHooks";
import TrackItemPageSection from "@/utils/TrackItemPageSection";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const formatSectionTimingData = (pid, sectionTimingData, action = "none") => {
  const mostViewedSection = Object.keys(sectionTimingData).reduce(
    (maxSection, section) =>
      sectionTimingData[section].totalViewTime >
      sectionTimingData[maxSection].totalViewTime
        ? section
        : maxSection,
    Object.keys(sectionTimingData)[0]
  );

  const visibleSections = Object.keys(sectionTimingData).filter(
    (section) => sectionTimingData[section].isVisible
  );

  let formattedData = [
    pid,
    {
      action,
      sectionTimingData,
      most_viewed_section: mostViewedSection,
      last_viewed_section: visibleSections,
      //   search_query: getFromLocalStorage("search_query")
    },
  ];

  return formattedData;
};

const addToItemsViewed = (formattedData) => {
  let itemsViewed = getFromLocalStorage("items_viewed");

  if (itemsViewed === null) return;

  itemsViewed = JSON.parse(itemsViewed);
  itemsViewed.push(formattedData);

  setToLocalStorage("items_viewed", JSON.stringify(itemsViewed));
};

const formatAndAddToItemsViewed = (pid, sectionTimingData, action = "none") => {
  let formattedData = formatSectionTimingData(pid, sectionTimingData, action);
  addToItemsViewed(formattedData);
};

export default function ItemPage() {
  const params = useParams();
  const [sectionTimingData, setSectionTimingData] = useState({});

  const [data, error, loading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/item/${params.pid}`
  );

  useEffect(() => {
    const beforeUnload = () => {
      formatAndAddToItemsViewed(params.pid, sectionTimingData);
    };
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [sectionTimingData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
       <Items />
       
      {/* <p>{data.pid}</p>
      <p>{data.brand}</p>
      <TrackItemPageSection
        id="header"
        setSectionTimingData={setSectionTimingData}
      >
        <div className="h-[400px]">Header</div>
      </TrackItemPageSection>
      <TrackItemPageSection
        id="chatbot"
        setSectionTimingData={setSectionTimingData}
      >
        <div className="h-[400px]">Chatbot</div>
      </TrackItemPageSection>

      <p>Hello Mom</p>

      <TrackItemPageSection
        id="footer"
        setSectionTimingData={setSectionTimingData}
      >
        <div className="h-[400px]">Footer</div>
      </TrackItemPageSection>

      <button
        onClick={() => {
          formatAndAddToItemsViewed(params.pid, sectionTimingData);
        }}
      >
        Button
      </button> */}
    </>
  );
}
