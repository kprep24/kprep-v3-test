"use client"

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table'
import useAuthStore from '@/store/AuthStore';
import React from 'react'


export interface CourseTableBody {
    SlNo: number;
    name: string;
    duration: "TwoYears" | "ThreeYears" | "FourYears" | "FiveYears";
    type: "Bachelor" | "Master" | "Doctorate";
    id: string;
    addedBy: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}


function CourseTableRow({ SlNo, name, duration, type, id, addedBy, onEdit, onDelete }: CourseTableBody) {

    let dur;

    if (duration === "FiveYears") {
        dur = 5;
    } else if (duration === "FourYears") {
        dur = 4;
    } else if (duration === "ThreeYears") {
        dur = 3;
    } else if (duration === "TwoYears") {
        dur = 2;
    }

    const { role } = useAuthStore();

    return (
        <TableRow key={id}>
            <TableCell>{SlNo}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{dur}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>{addedBy}</TableCell>
            <TableCell>
                <Button disabled={role!=="SuperAdmin"} variant={'link'} className='text-blue-500' onClick={() => onEdit(id)}>
                    Edit
                </Button>
                {role === "SuperAdmin" && <Button variant={'link'} className='text-red-400' onClick={() => onDelete(id)}>
                    Delete
                </Button>}
            </TableCell>
        </TableRow>
    )
}

export default CourseTableRow;
