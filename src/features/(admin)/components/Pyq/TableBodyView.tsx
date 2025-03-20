"use client";

import React from 'react'
import useGetPyqs from '../../api/pyq/useGetPyqs';
import { TableRow } from '@/components/ui/table';
import { TableFallback } from '@/components/TableFallback';
import PyqRow from './PyqRow';
import { useRouter } from 'next/navigation';


export interface IPyqs {
    addedBy: {
        firstName: string;
    },
    pyqType: "Mid" | "End" | "Supplement" | "Improvement";
    semType: "Sem" | "Autumn";
    title: string;
    id: string;
}


function TableBodyView({ pyqs, PyqList }: { pyqs: any, PyqList: IPyqs[] }) {


    const router = useRouter();
    

    if (pyqs.isError) {
        return <TableFallback message={`Error occured: ${pyqs.isError}`} colSpan={6} />
    }
    if (pyqs.isLoading) {
        return <TableFallback message="Loading..." colSpan={6} />
    }
    if (PyqList.length === 0) {
        return <TableFallback message="No PYQs available" colSpan={6} />
    }

    const handleDelte = () => { }
    const handleEdit = (id: string) => {
        router.push(`/pyqs/add?pyqId=${id}`)
    }


    return (
        <>
            {
                PyqList.map((pyq, i) => <PyqRow id={pyq.id} onDelete={handleDelte} onEdit={handleEdit} addedBy={pyq.addedBy} title={pyq.title} semType={pyq.semType} pyqType={pyq.pyqType} slNo={i + 1} key={i} />)
            }
        </>
    )
}

export default TableBodyView
