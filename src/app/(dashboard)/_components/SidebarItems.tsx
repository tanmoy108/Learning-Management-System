'use client'
import React from "react";
import { LayoutDashboard, Search } from "lucide-react";
import SideItem from "./SideItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Search,
    label: "Browse",
    href: "/search",
  },
];
const teacherRoutes = [
  {
    icon: LayoutDashboard,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: Search,
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
