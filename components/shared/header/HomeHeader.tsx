import React from "react";
import Navbar from "../navbar/Navbar";

const HomeHeader = () => {
  return (
    <header className="background-light100_dark100 shadow-sm border-b border-light200_dark600 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div>
    </header>
  );
};

export default HomeHeader;
