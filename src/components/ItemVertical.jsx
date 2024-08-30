import React from "react";

export default function ItemVertical(props) {
    let itemData = props.itemData;
    
    return (
        <>
            <div key={itemData.pid} className="inline-block aspect-square object-contain  w-[320px]  border-l-indigo-200 rounded-md ring-inset ring-slate-300 shadow-lg hover:shadow-slate-400 hover:translate-x-1 hover:duration-75 ring-1">
                <a href="#"><img src={itemData.images[0]} alt={itemData.title} className="flex items-center justify-center aspect-square object-contain w-60 pt-8 pl-10 scale-125 rounded-xl " /></a>
                <p className="text-start mt-5 cursor-pointer  text-clip text-xl overflow-hidden font-serif px-1 py-2 ">{itemData.title}</p>
                <p className="text-center cursor-pointer mt-0.1 mb-3">{itemData.price} RS</p>
            </div>
        </>
    );
};
