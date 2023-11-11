import React from "react";
import { MobileSidebar } from "./MobileSidebar";
import { NavbarLinks } from "@/components/NavbarLinks";

export const Navbar = () => {
  return (
    <div className="p-4 border-b border-[#121212] h-full flex items-center bg-[#121212] shadow-sm">
      <MobileSidebar />
      <NavbarLinks />
    </div>
  )
}
