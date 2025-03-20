"use client";

import React from 'react'
import AddBranch from './AddBranch'
import { useOpenSheet } from '@/features/(admin)/hooks/useOpenSheet'
import EditBranch from './EditBranch';
import useBrancheById from '@/features/(admin)/api/branche/useBrancheById';
import { IBranch } from './BrancheTableBody';

function BranchForm() {


    const { editId } = useOpenSheet();
    const branch = useBrancheById(editId);

    const branchData: IBranch = branch.data;

    return (
        <div className='wrapper mt-2'>
            {

                editId && branchData ? <EditBranch
                    loading={branch.isLoading}
                    id={editId!}
                    defaultValues={{
                        name: branchData.name,
                        shortName: branchData.shortName,
                        courseId: branchData.courseId,
                    }} /> : <AddBranch
                    defaultValues={{
                        name: "",
                        shortName: "",
                        courseId: "",
                    }}
                />

            }
        </div>
    )
}

export default BranchForm
