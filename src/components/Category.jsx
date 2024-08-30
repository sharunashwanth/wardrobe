import React from "react";
import ItemVertical from "./ItemVertical";

export default function Category(props) {
    let categoryName = props.categoryName;
    let categoryData = props.categoryData;
    
    return (
        <>
            <section className="mt-7 mb-5 p-4  border-neutral-500">
                <h2 className="text-xl font-semibold mb-2 pb-8">{ categoryName }</h2>
                <div className="flex overflow-x-scroll whitespace-nowrap space-x-5 no-scroll">
                    {categoryData.map((item) => <ItemVertical itemData={item}/>)}
                </div>
            </section>
        </>
    );
};
