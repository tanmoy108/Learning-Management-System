import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full h-[80px] bg-[#fff] z-40 shadow-own flex px-8 fixed">
        <Navbar />
      </div>
      <div className="bg-[#fff] border-r h-full w-[250px] z-50 inset-y-0 hidden lg:flex flex-col fixed">
        <Sidebar />
      </div>
      <div className="px-5 lg:pl-[280px] pt-[100px]">
        {children}
      </div>
    </>
  );
};

export default DashBoardLayout;
