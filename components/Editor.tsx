"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
};

export const Editor = ({
  onChange,
  value,
} : EditorProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])
  
  return (
    <div className="bg-[#121212] text-slate-200">
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};