"use client"
import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

import "@/app/globals.css"
import { Sidebar } from "@/components/UserDashboard/sidebar"
import { SearchBar } from "@/components/UserDashboard/Searchbar"
import { Button } from "@/components/ui/button"
import { Bell, Moon, Sun, User, Menu, GraduationCap } from "lucide-react"
import { signOut } from "next-auth/react"
import { useUserInfo } from "@/store/AuthStore"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import FloatingTimer from "@/components/promodoro/floatingTimer"
import { Comfortaa } from "next/font/google";
import UpgradeButton from "@/components/UserDashboard/upgradePro"
import ProUserButton from "@/components/UserDashboard/ProUserButton"
const comfortaa = Comfortaa({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { logout, userType } = useUserInfo(); // Extract isPro status from useUserInfo
  const path = usePathname();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Add click away functionality
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", !isDarkMode);
    }
  };

  const handleLogout: () => void = () => {
    logout();
    signOut();
    router.replace("/");
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  if (path === "/userboard/viewPdf" || path === "/userboard/viewPyq" || path === "/userboard/reapotedPdf" || path === "/userboard/view-sol"||path==="/userboard/viewCheatSheet") {
    return (
      <div className={`${comfortaa.className} antialiased`}>
        {children}
        <FloatingTimer />
      </div>
    )
  } else {
    return (
      <div className={`${comfortaa.className} antialiased`}>
        <div className="flex min-h-screen">
          {/* Mobile overlay */}
          <div
            className={cn(
              "fixed inset-0 bg-black/50 sm:hidden",
              isCollapsed ? "hidden" : "block"
            )}
            onClick={() => setIsCollapsed(true)}
          />

          <div className={cn(
            "fixed sm:relative",
            "sm:block", // Always visible on desktop
            isCollapsed ? "hidden sm:block" : "block",
            "z-50 sm:z-auto" // Higher z-index only on mobile
          )}>
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>

          <div className={cn(
            "flex-1 flex flex-col min-w-0",
            "transition-all duration-300",
            isCollapsed ? "sm:ml-[70px]" : "sm:ml-64" // Adjust margin based on collapse state
          )}>
            <header className="sticky top-0 flex h-16 items-center justify-between border-b sm:px-6 px-4 z-10 bg-mainpage-light dark:bg-mainpage-dark backdrop-blur-md backdrop-saturate-200">
              <div className="flex items-center gap-2 flex-1"> {/* Added flex-1 to allow search to expand */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden" // Only show on mobile
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center sm:hidden">
                  <Image src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859926/LOGO1_D_ixrlwm.png" alt="Logo" width={24} height={24} className="h-7 sm:h-7  w-auto dark:hidden block" />
                  <Image src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859926/LOGO1_D_2_pwkduv.png" alt="Logo" width={24} height={24} className="h-7 sm:h-7 w-auto hidden dark:block" />

                  <span className="ml-2 font-semibold ">
                    K-PREP
                  </span>
                </div>
                <div className="hidden sm:block w-full max-w-xl mx-auto">
                  <SearchBar />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="sm:hidden">
                  <SearchBar isMobile />
                </div>
                {userType !== "Free" ? (
                  <ProUserButton />
                ) : (
                  <UpgradeButton />
                )}

                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="  text-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-300">
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                {/* User dropdown menu */}
                <div className="relative" ref={userMenuRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                    onClick={toggleUserMenu}
                  >
                    <User className="h-5 w-5" />
                  </Button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ease-in-out transform origin-top-right">
                      <Link
                        href="/userboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
            <main className="flex-1 p-4 bg-mainpage-light dark:bg-mainpage-dark">{children}</main>
          </div>
          <FloatingTimer />
        </div>
      </div>
    )
  }
}