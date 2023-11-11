"use client";

import { Category } from "@prisma/client";
import {
  FcBiomass,
  FcBriefcase,
  FcCalculator,
  FcCloth,
  FcDebt,
  FcDecision,
  FcDepartment,
  FcElectronics,
  FcFilmReel,
  FcGlobe,
  FcMusic,
  FcPlanner,
  FcReading,
  FcSportsMode,
  FcStackOfPhotos,
  FcVoicePresentation
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Business Studies": FcBriefcase,
  "History": FcPlanner,
  "Computing": FcElectronics,
  "Geography": FcGlobe,
  "Physical Education": FcSportsMode,
  "Psychology": FcDecision,
  "Foreign Languages": FcVoicePresentation,
  "Mathematics": FcCalculator,
  "Art": FcStackOfPhotos,
  "Media Studies": FcFilmReel,
  "Science": FcBiomass,
  "English": FcReading,
  "Religious Education": FcDepartment,
  "Economics": FcDebt,
  "Design & Technology": FcCloth,
};

export const Categories = ({
  items,
} : CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 font-semibold">
      {items.map((item) => (
        <CategoryItem          
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}
