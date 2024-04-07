import { db } from "@/lib/db";
import { GetProgress } from "./getProgress";
import { Category, Chapter, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapter: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};
export const GetDashboard = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourse = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapter: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const arrayOfAllPurchaseCourses = purchasedCourse.map(
      (item) => item.course
    ) as CourseWithProgressWithCategory[];

    for (let singleCourse of arrayOfAllPurchaseCourses) {
      const progress = await GetProgress(userId, singleCourse.id);
      singleCourse["progress"] = progress;
    }

    const completedCourses = arrayOfAllPurchaseCourses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = arrayOfAllPurchaseCourses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
