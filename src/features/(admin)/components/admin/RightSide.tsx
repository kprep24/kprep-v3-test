"use client"
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { FaRegBell } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export function RightSide() {


    const { theme, setTheme } = useTheme();
    const router = useRouter();

    return <div className='right_side flex items-center justify-end gap-5'>
        {/* notification */}
        <Avatar className='bg-main flex justify-center items-center text-xl cursor-pointer'>
            <FaRegBell />
        </Avatar>

        {/* theme controller */}
        <Avatar className='bg-main flex justify-center items-center text-xl cursor-pointer font-bold'>

            {theme === "dark" ? <MdOutlineLightMode onClick={() => setTheme("light")} /> : <MdOutlineDarkMode onClick={() => setTheme("dark")} />}
        </Avatar>
        {/* profile icon */}
        <Avatar onClick={() => router.push("/profile")} className='select-none cursor-pointer'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </div>
}