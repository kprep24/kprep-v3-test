import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { IPyqs } from './TableBodyView'
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/AuthStore';


interface IPyqRow extends Omit<IPyqs, '' | 'semType'> {
    slNo: number;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}




function QnaRow({ id, addedBy, onDelete, onEdit, slNo, title, pyqType, subject }: IPyqRow) {


    const { role } = useAuthStore()

    return (
        <TableRow>
            <TableCell>{slNo}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell> {pyqType} </TableCell>
            <TableCell>{subject.fullName}</TableCell>
            <TableCell>

                <Button onClick={() => onEdit(id)} variant={"link"} className='text-blue-500'>
                    Edit
                </Button>
                {role === "SuperAdmin" && <Button onClick={() => onDelete(id)} variant={"link"} className='text-red-500'>
                    Delete
                </Button>}
            </TableCell>
        </TableRow>
    )
}

export default QnaRow
