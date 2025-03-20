"use client"

import useAuthStore from '@/store/AuthStore';
import React from 'react'
import Row1 from './Row1';
import Row2 from './Row2';
import Visuals from './Visuals';


import { useDashboardData } from '../../api/dashboard/useDashboardData';
import { DashboardCardSkeleton } from './DashboardCardSkeleton';
function Dashboard() {
    const { role } = useAuthStore();
    const { data: dashboardData, isLoading, error } = useDashboardData();


    if (isLoading) {
        return <div className='flex flex-wrap'>
            {
                Array.from({ length: 15 }).map((_, index) => <DashboardCardSkeleton key={index} />)
            }
        </div>
    }
    if (error) return <p>Error fetching data</p>;
    if (!dashboardData) return <p>No data available</p>
    return (
        <>
            <Row1 />
            {role === "SuperAdmin" && <Row2 userDetails={dashboardData.users} />}
            {role === "SuperAdmin" && <Visuals dashboardData={dashboardData} />}
        </>
    )
}

export default Dashboard
