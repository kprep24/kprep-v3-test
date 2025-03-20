"use client"

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table'
import useAuthStore from '@/store/AuthStore';



interface IBrancheTableRow {
    name: string;
    shortName: string;
    courseName: string;
    addBy: string;
    id: string;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    slNo: number;
}

function BrancheTableRow({ slNo, name, shortName, courseName, addBy, id, onDelete, onEdit }: IBrancheTableRow) {
    const { role } = useAuthStore();
    return (
        <TableRow>
            <TableCell>{slNo}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{shortName}</TableCell>
            <TableCell>{courseName}</TableCell>
            <TableCell>{addBy}</TableCell>
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

export default BrancheTableRow
