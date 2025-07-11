import React from "react";
import Navbar from "../navbar/Navbar";

const HomeHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-600 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div>
    </header>
  );
};

export default HomeHeader;
