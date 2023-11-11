import React from "react";
import { Logo } from "./Logo";
import { SidebarLinks } from "./SidebarLinks";

export const Sidebar = () => {
  return (
    <div className="h-full border-r border-[#121212] flex flex-col overflow-y-auto bg-[#121212] shadow-sm">
      <div className="p-6 mx-auto">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarLinks />
      </div>
    </div>
  )
}
