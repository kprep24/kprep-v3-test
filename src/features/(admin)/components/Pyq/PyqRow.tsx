import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { IPyqs } from './TableBodyView'
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/AuthStore';


interface IPyqRow extends IPyqs {
    slNo: number;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}



function PyqRow({ id, addedBy, onDelete, onEdit, pyqType, semType, slNo, title }: IPyqRow) {


    const { role } = useAuthStore()

    return (
        <TableRow>
            <TableCell>{slNo}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{`${semType + ' [' + pyqType + ']'}`}</TableCell>
            <TableCell>{addedBy.firstName}</TableCell>
            <TableCell>

                <Button disabled={role !== "SuperAdmin"} onClick={() => onEdit(id)} variant={"link"} className='text-blue-500'>
                    Edit
                </Button>
                {role === "SuperAdmin" && <Button onClick={() => onDelete(id)} variant={"link"} className='text-red-500'>
                    Delete
                </Button>}
            </TableCell>
        </TableRow>
    )
}

export default PyqRow
