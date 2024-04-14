"use client";
import { cn } from "@/lib/utils";
import { Chapter, UserProgress } from "@prisma/client";
import { Lock, CirclePlay, CircleCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface chapterListProps {
  id: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
  courseId: string;
}
function ChapterList({
  id,
  title,
  isCompleted,
  isLocked,
  courseId,
}: chapterListProps) {
  const pathname = usePathname();
  const href = `/courses/${courseId}/chapters/${id}`;
  const isActive = pathname === href;

  return (
    <div>
      <Link
        href={`/courses/${courseId}/chapters/${id}`}
        className={cn(
          "pl-8 flex items-center gap-x-3 transition-all",
          isActive && "bg-[#D8F1EA] "
        )}
      >
        <div className="w-full flex items-center gap-x-2  py-2 capitalize">
          {isLocked ? (
            <Lock className="text-[#17B686]" />
          ) : isCompleted ? (
            <CircleCheck className="text-[#17B686]" />
          ) : (
            <CirclePlay className="text-[#17B686]" />
          )}
          {title}
        </div>
        <div
          className={cn(
            "opacity-0 border-4 border-[#17B686] h-10 transition-all",
            isActive && "opacity-100"
          )}
        />
      </Link>
    </div>
  );
}

export default ChapterList;
