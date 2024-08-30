"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Items from "@/components/Items";
import { exportTrackingData, getFromLocalStorage, setToLocalStorage } from "@/utils/awesomeFuncs";
import { useFetch } from "@/utils/awesomeHooks";
import TrackItemPageSection from "@/utils/TrackItemPageSection";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";

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

  if (itemsViewed.length >= 7) {
    exportTrackingData("item_changed");
  }
};

const formatAndAddToItemsViewed = (pid, sectionTimingData, action) => {
  let formattedData = formatSectionTimingData(pid, sectionTimingData, action);
  addToItemsViewed(formattedData);
};

export default function ItemPage() {
  const params = useParams();
  const [sectionTimingData, setSectionTimingData] = useState({});
  const [action, setAction] = useState("none");

  const [data, error, loading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/item/${params.pid}`
  );

  useEffect(() => {
    const beforeUnload = () => {
      formatAndAddToItemsViewed(params.pid, sectionTimingData, action);
    };
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [sectionTimingData]);

  if (loading === true) return <Loading />;
  if (error !== null) return <Error message={error} />;

  return (
    <>
      <Header />
      <Items
        TrackItemPageSection={TrackItemPageSection}
        setSectionTimingData={setSectionTimingData}
        action={action}
        setAction={setAction}
        data={data}
      />
    </>
  );
}
