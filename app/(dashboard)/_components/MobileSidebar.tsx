import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="text-slate-500 font-extrabold"/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-[#121212] text-slate-500 font-extrabold border-[#121212]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
