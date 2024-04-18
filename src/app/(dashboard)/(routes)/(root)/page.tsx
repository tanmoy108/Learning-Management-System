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

  return (
    <div className="h-screen">
      <div className="flex xs:flex-col md:flex-row gap-5 mb-5">
        <div className="w-[363px] h-[77px] rounded-md bg-[#fff] flex items-center gap-x-2 pl-4">
           <img alt="inprogress" src="/clock.png" />
           <p className="text-[18px]">In Progress: {coursesInProgress.length}</p>
        </div>
        <div className="w-[363px] h-[77px] rounded-md bg-[#fff] flex items-center gap-x-2 pl-4">
           <img src="/completed.png" alt="completedcourse" />
           <p className="text-[18px]">Completed Course: {completedCourses.length}</p>
        </div>
        {/* <Icon label="In Progress" value={coursesInProgress.length} icon={Clock} variant="default"/> */}
        {/* <Icon label="Completed Courses" value={completedCourses.length} icon={CircleCheck} variant="success"/> */}
      </div>
      <div>
      <CourseList item={[...coursesInProgress,...completedCourses]}/>
      </div>
    </div>
  );
};

export default DashBoardRoot;
