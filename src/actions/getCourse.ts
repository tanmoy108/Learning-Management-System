import { Category, Course, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { GetProgress } from "./getProgress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const GetCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapter: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });


    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
            //if not buy then shows progress null 
          if (course.purchase.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await GetProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
