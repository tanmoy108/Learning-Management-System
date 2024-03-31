import { db } from "@/lib/db";

export const GetProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    console.log("publishedChapters", publishedChapters); //[ { id: '4e4cff83-fc98-4d9a-95a0-85ec21f17173' } ]
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    console.log("publishedChapterIds", publishedChapterIds); // [ '4e4cff83-fc98-4d9a-95a0-85ec21f17173' ]
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });
    console.log("validCompletedChapters", validCompletedChapters); // 0
    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;
    console.log("progressPercentage", progressPercentage); // 0

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};
