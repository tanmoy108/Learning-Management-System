"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUpload {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
const FileUpload = ({ onChange, endpoint }: FileUpload) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res: any) => {
        onChange(res?.[0].url);
        toast.success("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default FileUpload;
