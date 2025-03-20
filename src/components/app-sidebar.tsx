"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navMenusSuperAdmin, navMenusAdmin } from "@/constants/MenuItems";
import useAuthStore from "@/store/AuthStore";
import { useTheme } from "next-themes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  const { firstName, role } = useAuthStore();
  const { theme } = useTheme();

  // Determine navigation items based on role
  const navMenus = role === "Admin" ? navMenusAdmin : navMenusSuperAdmin;

  return (
    <Sidebar {...props}>
      {/* Sidebar Header */}
      <SidebarHeader className={theme === "light" ? "bg-gray-300" : "bg-gray-900"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className={theme === "light" ? "bg-gray-300" : "bg-gray-900"}>
        <SidebarGroup>
          {/* Welcome Section */}
          <div className="p-4 rounded-md bg-slate-950 text-white">
            <h1 className="text-lg font-bold">Welcome {firstName}</h1>
            <p className="text-sm">Effortlessly manage the website with precision and control.</p>
          </div>

          {/* Sidebar Menu */}
          <SidebarMenu className="mt-4">
            {navMenus.map((item) => (
              <SidebarMenuSubItem key={item.title}>
                <SidebarMenuSubButton className="text-lg flex items-center gap-3" isActive={path.startsWith(item.url)} asChild>
                  <Link href={item.url}>
                    <>
                      {item.icon} <span>{item.title}</span>
                    </>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
