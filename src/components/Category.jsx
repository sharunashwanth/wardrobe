import React from "react";
import ItemVertical from "./ItemVertical";

export default function Category(props) {
  let categoryName = props.categoryName;
  let categoryData = props.categoryData;

  return (
    <>
      <section className="px-4 py-2 border-neutral-500">
        <h2 className="text-xl font-semibold mb-6">{categoryName}</h2>
        <div className="flex space-x-5 overflow-x-scroll no-scroll">
          {categoryData.map((item) => (
            <ItemVertical itemData={item} />
          ))}
        </div>
      </section>
    </>
  );
}
