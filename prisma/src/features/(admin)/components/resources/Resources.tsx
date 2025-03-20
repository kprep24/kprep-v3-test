"use client"
import React from 'react'
import CustomHeader from '../CustomeCardHeader.tsx/Header'
import { useRouter } from 'next/navigation';
import ResourcesTable from './ResourcesTable';

function Resources() {

    const router = useRouter()

    return (
        <>
            <CustomHeader
                buttonTitle='Add Resources'
                title='Resources'
                onClick={() => router.push("/resources/add")}
            />
            <ResourcesTable />
        </>
    )
}

export default Resources
