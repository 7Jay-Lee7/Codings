import { NavbarLinks } from "@/components/NavbarLinks";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { CourseMobileSidebar } from "./CourseMobileSidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseNavbar = ({
  course,
  progressCount,
} : CourseNavbarProps) => {
  return (
    <div className="p-4 border-b border-[#121212] h-full flex items-center bg-[#121212]">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarLinks />
    </div>
  )
}
