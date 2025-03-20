"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, BookOpen, FileText, Calculator, ChevronLeft, ChevronRight, LogOut, Users, Disc2, ScrollText, BookAudio, SquarePlay } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { useUserInfo } from "@/store/AuthStore"

const navItems = [
  { title: "Dashboard", href: "/userboard", icon: LayoutDashboard },
  { title: "Resources", href: "/userboard/userresources", icon: BookOpen },
  { title: "PYQs", href: "/userboard/userpyqs", icon: FileText },
  { title: "Online Videos", href: "/userboard/youtube-playlist", icon: SquarePlay },
  { title: "Cheat Sheet", href: "/userboard/cheat-sheet", icon: ScrollText },
  { title: "SGPA Calculator", href: "/userboard/calculator", icon: Calculator },
  { title: "Faculty Details", href: "/userboard/faculty-details", icon: Users },
  { title: "Course Details", href: "/userboard/course-details", icon: BookAudio },
  { title: "Focus Mode", href: "/userboard/focus-test", icon: Disc2 }
]


export function Sidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) {
  const pathname = usePathname()
  const { logout } = useUserInfo();
  const router = useRouter();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  };
  const handleLogOut = () => {
    logout();
    signOut();
    router.replace("/");
  }

  return (
    <aside
      onMouseEnter={() => {
        if (window.innerWidth >= 1024) setIsCollapsed(false);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) setIsCollapsed(true);
      }}
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col border-r bg-usersidebar-light dark:bg-usersidebar-dark transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-64",
      )}
    >
      <div className="flex h-20 items-center justify-between px-4 border-b">
        <Link href="/userboard">
          <div className="flex items-center">
            <Image src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859926/LOGO1_D_ixrlwm.png" alt="Logo" width={24} height={24} className="h-9 sm:h-7  w-auto dark:hidden block" />
            <Image src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859926/LOGO1_D_2_pwkduv.png" alt="Logo" width={24} height={24} className="h-9 sm:h-7 w-auto hidden dark:block" />

            <span

              className={cn(
                "ml-2 font-semibold text-lg transition-all duration-300",
                isCollapsed && "w-0 overflow-hidden opacity-0",
              )}
            >
              K-PREP
            </span>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-usersidebar-light-link dark:bg-usersidebar-dark-link text-white hover:bg-usersidebar-light-link dark:hover:bg-usersidebar-dark-link"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 rounded-sm rounded-l-3xl px-3 mb-3 py-2 text-[15px] transition-colors",
                      pathname === item.href ? "bg-usersidebar-light-link text-usersidebar-light-link-text dark:bg-usersidebar-dark-link dark:text-usersidebar-dark-link-text" : "text-black dark:text-white hover:bg-usersidebar-light-link/40 dark:hover:bg-usersidebar-dark-link/30",
                      isCollapsed && "justify-center px-2",
                    )}

                  >

                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        <div className="border-t border-gray-300 dark:border-gray-800 p-2 mt-auto">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogOut}
                  className={cn(
                    "w-full flex items-center gap-5 rounded-lg px-3 py-2.5 text-base transition-all duration-200 hover:scale-[1.02] group",
                    "text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <LogOut  className={cn(
                    "h-5 w-5",
                    "text-gray-600 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400"
                  )} />
                  {!isCollapsed && <span>Sign Out</span>}
                </button>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Sign Out</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  )
}



