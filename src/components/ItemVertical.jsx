import React from "react";

export default function ItemVertical(props) {
  let itemData = props.itemData;
  let itemURL = `/item/${itemData.pid}`;

  return (
    <>
      <div
        key={itemData.pid}
        className="inline h-[320px] min-w-[260px] max-w-[260px] p-4 border-l-indigo-200 rounded-xl ring-1  ring-inset ring-slate-300 shadow-lg hover:shadow-slate-400 hover:scale-[1.015] hover:duration-75 overflow-hidden whitespace-nowrap text-ellipsis text-center"
      >
        <a href={itemURL} className="w-full h-full flex flex-col items-center justify-between">
        <img
            src={itemData.images[0]}
            alt={itemData.title}
            className="min-h-[70%] rounded-md"
        />
        <div className="w-full flex flex-col justify-center items-center space-y-2">
            <p title={itemData.title} className="w-[80%] overflow-hidden whitespace-nowrap text-ellipsis">{itemData.title}</p>
            <p className="text-sm">₹ {itemData.price}</p>
        </div>
        </a>
      </div>
    </>
  );
  "flex items-center justify-center aspect-square object-contain w-60 pt-8 pl-10 scale-125 rounded-xl "
  "mt-5 cursor-pointer  text-xl font-serif px-1 py-2 w-[60%]"
  "text-center cursor-pointer mt-0.1 mb-3"
}
