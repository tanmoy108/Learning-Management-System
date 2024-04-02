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

const CourseList = ({ item }: courseListProps) => {
  return (
    <>
      <div>{item.length === 0 && <div>No Course Found</div>}</div>
      <div className="grid grid-cols-3 gap-3">
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
    </>
  );
};

export default CourseList;
