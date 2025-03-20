"use client"

import React from 'react'
import useGetResources from '../../api/resources/useGetResource'
import { TableFallback } from '@/components/TableFallback';
import ResourceRow from './ResourceRow';
import useToogleFreePremium from '../../api/resources/useToogleFreePremium';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';



export interface IResource {
    id: string;
    title: string;
    contentType: string;
    freemium: "Free" | "Premium";
    visibility: "Public" | "Private";
    subject: {
        fullName: string;
        shortName: string;
    }
}

function ResourceTableBodyBox({ resources, resourcesData }: { resources: any, resourcesData: IResource[] }) {

    const colSpan = 6;
    if (resources.isError) {
        return <TableFallback message={`Error: ${resources.error.message}`} colSpan={colSpan} />
    }
    if (resourcesData.length === 0) {
        return <TableFallback message='No Resources available' colSpan={colSpan} />
    }
    if (resources.isLoading) {
        return <TableFallback message='Loading...' colSpan={colSpan} />
    }
    //THis is ok
    const freePremium = useToogleFreePremium();
    const router = useRouter();
    const handleDelete = () => { }
    const handleEdit = (id: string) => {
        router.push(`/resources/add?id=${id}`)
    }
    const onToogleVisibility = () => { }
    const onFreePremimum = (id: string) => {
        freePremium.mutate(id, {
            onSuccess: (message: any) => {
                toast(message.message || "Change Status")
            },
            onError: (error: any) => {
                toast(error.message || "Error updating");
            }
        })
    }
    console.log(resourcesData)
    return (
        <>
            {
                resourcesData && resourcesData.map((item, i: number) => {
                    return <ResourceRow
                        title={item.title}
                        key={i}
                        id={item.id}
                        contentType={item.contentType}
                        freemium={item.freemium}
                        shortName={item.subject.shortName}
                        visibility={item.visibility}
                        onEdit={handleEdit}
                        onDelete={handleDelete} SlNo={i + 1}
                        onFreePremimum={onFreePremimum}
                        onToogleVisibility={onToogleVisibility}
                    />
                })
            }

        </>
    )
}

export default ResourceTableBodyBox
