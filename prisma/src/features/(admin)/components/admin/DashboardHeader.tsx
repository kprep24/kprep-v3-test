"use client"
import React from 'react'
import { LeftSide } from './LeftSide';
import { RightSide } from './RightSide';


function DashboardHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex w-full  items-center gap-2 px-3 justify-between">
                {/* left side */}
                <LeftSide />
                {/*  right side */}
                <RightSide />
            </div>
        </header>
    )
}

export default DashboardHeader;
