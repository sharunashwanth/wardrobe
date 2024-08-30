import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-around p-0 text-white sticky top-0 z-10 bg-cyan-300 py-2 mb-5">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            className="bg-cover rounded-full"
            width={50}
            height={80}
          />
          <h1 className=" flex text-2xl font-bold font-serif text-slate-100 top-0 mt-1">
            Wardrobe
            <span className="text-blue-700 mr-60">Consult</span>
          </h1>
        </div>
        <form action="/search">
          <input
            type="text"
            placeholder="Search"
            name="query"
            className="w-80 h-9 pl-5 rounded-full text-slate-700 border-x-sky-700 ring-1 ring-slate-900/5 hover:bg-slate-50  hover:ring-black/[0.11]"
          />
          <input type="submit" hidden />
        </form>
      </header>
    </>
  );
}
