import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import { CourseSidebar } from "./CourseSidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseMobileSidebar = ({ 
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="text-slate-500 font-extrabold"/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 text-slate-500 font-extrabold w-72">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}