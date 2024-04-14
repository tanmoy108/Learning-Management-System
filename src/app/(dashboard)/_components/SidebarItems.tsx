'use client'
import React from "react";
import SideItem from "./SideItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: "/dashboard.png",
    label: "Dashboard",
    href: "/",
  },
  {
    icon: "/browser.png",
    label: "Browse",
    href: "/search",
  },
];
const teacherRoutes = [
  {
    icon:"/courses.png",
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: "/analytics.png",
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
const SidebarItems = () => {
  const pathName = usePathname()

 
  const isTeacherMode = pathName?.includes("/teacher")

  const routes = isTeacherMode  ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col">
      {routes.map((route, index) => (
        <SideItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarItems;
