import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ParentCourseSidebar from "./parentCourseSidebar";
import { useState } from "react";

const BrowseMobileNavbar = ({courseId}:{courseId:string}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <ParentCourseSidebar courseId={courseId}/>
      </SheetContent>
    </Sheet>
  );
};

export default BrowseMobileNavbar;
