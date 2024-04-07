import { GetDashboard } from "@/actions/getDashboard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseList from "../search/_components/courseList";
import Icon from "./_components/iconBadge";
import { CircleCheck, Clock } from "lucide-react";

const DashBoardRoot = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const { completedCourses, coursesInProgress } = await GetDashboard(userId);

  console.log("tanmoy", completedCourses);
  console.log("punam", coursesInProgress);

  return (
    <div>
      <div className="flex gap-x-10">
        <Icon label="In Progress" value={coursesInProgress.length} icon={Clock} variant="default"/>
        <Icon label="Completed Courses" value={completedCourses.length} icon={CircleCheck} variant="success"/>
      </div>
      <div className="grid">
      <CourseList item={[...coursesInProgress,...completedCourses]}/>
      </div>
    </div>
  );
};

export default DashBoardRoot;
