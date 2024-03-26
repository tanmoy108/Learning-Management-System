"use client";
import "react-quill/dist/quill.bubble.css";

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface PreviewProps {
  value: string;
}

const RichPreview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return <ReactQuill theme="bubble" value={value} readOnly />;
};

export default RichPreview;
