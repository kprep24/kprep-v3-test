"use client";

import React from 'react'
import useGetPyqs from '../../api/pyq/useGetPyqs';
import { TableRow } from '@/components/ui/table';
import { TableFallback } from '@/components/TableFallback';
import PyqRow from './QnaRow';
import useGetQna from '../../api/repated-qna/useGetPyqs';
import QnaRow from './QnaRow';
import { useRouter } from 'next/navigation';


export interface IPyqs {
    addedBy: {
        firstName: string;
    },
    pyqType: "Mid" | "End" | "Supplement" | "Improvement";
    title: string;
    id: string;
    subject: {
        fullName: string;
    }
}


function TableBodyView() {


    const pyqs = useGetQna();
    const router = useRouter();
    const PyqList: IPyqs[] = pyqs.data || [];
    console.log(PyqList)
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
    const handleEdit = () => {
        // router.push('/repated-question/add')
    }


    return (
        <>
            {
                PyqList.map((pyq, i) => <QnaRow
                    subject={pyq.subject}
                    pyqType={pyq.pyqType}
                    id={pyq.id} onDelete={handleDelte} onEdit={handleEdit} addedBy={pyq.addedBy} title={pyq.title} slNo={i + 1} key={i} />)
            }
        </>
    )
}

export default TableBodyView
