import { Category, Course } from "@prisma/client";
import React from "react";
import CourseListItem from "./courseListItem";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};

interface courseListProps {
  item: CourseWithProgressWithCategory[];
}

const CourseList =async ({ item }: courseListProps) => {
  return (
    <div className="mt-5 bg-red-400">
      <div>{item.length === 0 && <div>No Course Found</div>}</div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 xs:gap-y-3 md:gap-2 xs:place-items-center bg-[#ebeba7] w-full place-content-center">
        {item.map((item) => (
          <CourseListItem
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chapterLength={item.chapter.length}
            progress={item.progress}
            price={item.price!}
            category={item?.category?.name!}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
