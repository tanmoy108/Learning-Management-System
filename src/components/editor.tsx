"use client";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const RichEditor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};

export default RichEditor;
