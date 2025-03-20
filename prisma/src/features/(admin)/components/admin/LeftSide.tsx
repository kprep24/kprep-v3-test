"use client"
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { usePathname } from 'next/navigation';



export function LeftSide() {


    const applicationName = "K-Prep";

    const path = usePathname();
    const pathArray = path.split("/");
    const Bredcum = [];
    for (let i = 0; i < pathArray.length; i++) {

        const path = pathArray[i];
        const pathName = path.charAt(0).toUpperCase() + path.slice(1) + "/";
        Bredcum.push(pathName);

    }

    return <div className='left_side flex items-center'>
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        {applicationName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {/* {Bredcum.map((item, i) => <BreadcrumbItem key={i}>
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                </BreadcrumbItem>)} */}
            </BreadcrumbList>
        </Breadcrumb>
    </div>
}
