import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    
    <div className="w-full">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
        {/* bg-gray-800 ใส่รูปเอสป้า*/}
        
        
        <h1 className="text-xl md:text-base text-white mb-1">
          SALA Spring/Summer 2026
        </h1>

        <h2 className="text-2xl md:text-4xl text-white mb-4 tracking-wide">
          IN HER OWN LANGUAGE
        </h2>

        <Link
          to="/seemoreinher"
          className="bg-[#D9D9D9] text-black py-2 px-2 text-xs font-bold tracking-wider"
        >
          SEE MORE
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <h1 className="text-xl md:text-base text-white mb-1 tracking-widest">
          SALA
        </h1>

        <h2 className="text-2xl md:text-4xl text-white mb-4 tracking-widest">
          SPRING SUMMER 2026
        </h2>

        <button className="bg-[#D9D9D9] text-black py-2 px-2 text-xs font-bold tracking-wider">
          SEE MORE
        </button>
     
      </div>
    </div>
  );
};

export default MainPage;
