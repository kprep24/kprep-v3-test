import React, { ReactNode } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardHeader from '@/features/(admin)/components/admin/DashboardHeader';
function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
             <AppSidebar  /> 
            <SidebarInset>
                <DashboardHeader/>
                <div className="flex flex-1 flex-col gap-4 p-4 px-3">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout
