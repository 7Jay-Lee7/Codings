import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/IconBadge"

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className="border-2 border-[#121212] bg-[#121212] rounded-md flex items-center gap-x-2 p-3">
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p className="font-extrabold text-slate-500">
          {label}
        </p>
        <p className="text-slate-500 text-sm font-extrabold">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  )
}