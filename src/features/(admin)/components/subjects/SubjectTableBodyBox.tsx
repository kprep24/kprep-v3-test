"use client"

import React from 'react'
import { TableFallback } from '@/components/TableFallback';
import SubjectTableRow from './SubjectTableRow';
import { useRouter } from 'next/navigation';

export interface IsubjectData {
    fullName: string;
    shortName: string;
    code: string;
    credit: string;
    year: string;
    id: string;
    _count: {
        Pyqs: number;
        Resources: number;
    }
}

function SubjectTableBodyBox({ subjects, subjectData }: { subjectData: IsubjectData[], subjects: any }) {

    const router = useRouter();
    const colSpan = 7;

    if (subjects.isError) {
        return <TableFallback message={`Error: ${subjects.error.message}`} colSpan={colSpan} />
    }
    if (subjectData && subjectData.length === 0) {
        return <TableFallback message='No subjects available' colSpan={colSpan} />
    }
    if (subjects.isLoading) {
        return <TableFallback message='Loading...' colSpan={colSpan} />
    }

    const handleEdit = (id: string) => {
        router.push(`/subjects/add?id=${id}`)
    }
    const handleDelete = () => { }

    return (
        <>
            {subjectData.map((item, i: number) => <SubjectTableRow
                onEdit={handleEdit}
                key={i}
                onDelete={handleDelete}
                SlNo={i + 1}
                fullName={item.fullName}
                shortName={item.shortName}
                code={item.code}
                credit={item.credit}
                year={item.year}
                id={item.id}
                _count={item._count}
            />)}
        </>
    )
}

export default SubjectTableBodyBox
