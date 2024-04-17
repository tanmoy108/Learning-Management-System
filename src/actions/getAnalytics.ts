import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type purchaseWithCourse = Purchase & {
  course: Course;
};

const groudByCourse = (purchasedCourses: purchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchasedCourses.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

const getAnalytics = async (userId: string) => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });

    const getObjectWithTitlePrice = groudByCourse(purchasedCourses); // {"a":22,"b":34}

    const objectToArrayKeyValue = Object.entries(getObjectWithTitlePrice).map(
      ([courseTitle, total]) => ({ name: courseTitle, total: total })
    ); // [
    //     { name: "Python", total: 200 },
    //     { name: "Javascript", total: 150 }
    //   ]
    const totalRevenue = objectToArrayKeyValue.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchasedCourses.length;

    return {
    objectToArrayKeyValue,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    console.log("getAnalytics", error);
    return {
        objectToArrayKeyValue: [],
        totalRevenue: 0,
        totalSales: 0,
      }
  }
};

export default getAnalytics;
