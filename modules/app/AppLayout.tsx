import React from "react";
import { HeaderController } from "../display/HeaderController";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useAppStore from "./useAppStore";

interface AppLayoutProps {
  title?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  return (
    <>
      {!title || <HeaderController title={title} />}
      <div className="h-screen flex flex-col">
        <span className="text-center text-error p-2 border-b w-full">
          under development
        </span>
        <Navbar />
        <div className="flex flex-row flex-nowrap h-full">
          <Sidebar />
          {children}
        </div>
      </div>
    </>
  );
};
