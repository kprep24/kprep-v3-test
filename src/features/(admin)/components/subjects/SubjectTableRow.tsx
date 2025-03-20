"use client"

import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { IsubjectData } from './SubjectTableBodyBox'
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/AuthStore';


interface ISubjectTableRow extends IsubjectData {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    SlNo: number;
}

function SubjectTableRow({ SlNo, fullName, shortName, credit, code, id, onDelete, onEdit, _count }: ISubjectTableRow) {


    const { role } = useAuthStore();

    return (
        <TableRow>
            <TableCell>{SlNo}</TableCell>
            <TableCell>{`${fullName + ' [' + shortName + '] '}`}</TableCell>
            <TableCell>
                {credit}
            </TableCell>
            <TableCell>
                {code}
            </TableCell>
            <TableCell>
                {_count?.Resources}
            </TableCell>
            <TableCell>
                {_count?.Pyqs}
            </TableCell>
            <TableCell>
                <Button disabled={role !== "SuperAdmin"} onClick={() => onEdit(id)} variant={"link"} className='text-blue-500'>
                    Edit
                </Button>
                <Button disabled={role !== "SuperAdmin"} onClick={() => onDelete(id)} variant={"link"} className='text-red-500'>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default SubjectTableRow
