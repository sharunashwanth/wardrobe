import Image from "next/image";
import React from "react";

export default function Header() {
    return (
        <>
            <header className="flex items-center justify-between p-0 text-white ">
                <div className="flex items-center space-x-4 w-[540rem] bg-cyan-50  border-x-neutral-600  ">
                    <Image src="/logo.jpg" className=" bg-cover rounded-md" width={90} height={100} />
                    <h1 className=" flex text-3xl font-bold font-serif text-neutral-300 top-0 ">Wardrobe<span className="text-3xl text-sky-400 mr-60 ">Consult</span></h1>
                    <input type="text" placeholder="search"  className="w-80 h-10 pl-5 rounded-full mt-8 mb-3 text-slate-700 border-x-sky-700 ring-1 ring-slate-900/5 hover:bg-slate-50  hover:ring-black/[0.11]" />
                </div>
            </header>
        </>
    );
};
