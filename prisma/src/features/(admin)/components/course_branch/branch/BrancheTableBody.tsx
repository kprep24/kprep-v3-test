"use client"

import useGetBranches from '@/features/(admin)/api/branche/useGetAllBranches'
import React, { useState } from 'react'
import BrancheTableRow from './BrancheTableRow'
import { TableFallback } from '@/components/TableFallback'
import { useDeleteBranche } from '@/features/(admin)/api/branche/useDeleteBranch'
import AlertDialogBox from '@/components/AlertBox/AlertDialogBox'
import { toast } from 'sonner'
import { useOpenSheet } from '@/features/(admin)/hooks/useOpenSheet'


export interface IBranch {
    name: string
    shortName: string
    addedBy: {
        firstName: string
    },
    Course: {
        name: string
    },
    id: string
    courseId: string
}


function BrancheTableBody() {

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [show, setShow] = useState<boolean>(false);


    const branches = useGetBranches();
    const deleteBracnch = useDeleteBranche();
    const { setIsBranchDialogOpen, onOpen, setEditId } = useOpenSheet();
    const branchesData: IBranch[] = branches.data;

    const colSpan = 6;


    if (branches.isLoading) {
        return <TableFallback message="Loading..." colSpan={colSpan} />
    }

    if (branches.isError) {
        return <TableFallback message={`Error: ${branches.error}`} colSpan={colSpan} />
    }

 
    const handleDelete = (id: string) => {
        setShow(true);
        setDeleteId(id);
    }
    const handleEdit = (id: string) => {
        setEditId(id);
        setIsBranchDialogOpen(true);
        onOpen(true);
    }
    const handleConfirmDelete = () => {
        if (deleteId) {
            deleteBracnch.mutate({ id: deleteId }, {
                onSuccess: () => {
                    toast("Branches deleted successfully");
                    setShow(false);
                    setDeleteId(null);
                },
                onError: (error) => {
                    toast.error("Error deleting branches: " + error.message);
                    setShow(false);
                    setDeleteId(null);
                }
            });
        }
        setShow(false);
    }
    return (
        <>
            {branchesData.map((item, i) => <BrancheTableRow
                slNo={i + 1}
                key={i}
                onDelete={handleDelete}
                onEdit={handleEdit}
                shortName={item.shortName}
                addBy={item.addedBy.firstName}
                courseName={item.Course.name}
                id={item.id}
                name={item.name} />)
            }
            <AlertDialogBox
                title="Delete Branch Confirmation"
                description="Are you sure you want to delete this branch? This action cannot be undone."
                show={show}
                onConfirm={handleConfirmDelete}
                setShow={() => setShow(false)}
            />
        </>
    )
}

export default BrancheTableBody
