'use client'
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Search from "./search";

const NavbarButton = () => {
  const pathName = usePathname();

  const isTeacherMode = pathName?.startsWith("/teacher")
  const isPlayerMode = pathName?.includes("/courses")
  const isSearchMode = pathName === "/search"

  return (
    <>
    <div>
     {isSearchMode &&  <Search/>}
    </div>
    <div className="flex items-center gap-x-3" >
      {
        isTeacherMode || isPlayerMode ? (
          <Link href="/">
          <Button variant="ghost" size="sm" >
            Exit
          </Button>
          </Link>
        ):(
          <Link href={"/teacher/courses"}>
          <Button variant="ghost" size="sm">
            Teacher Mode
          </Button>
          </Link>
        )
      }
      <UserButton afterSignOutUrl="/" />
    </div>
    </>
  );
};

export default NavbarButton;
