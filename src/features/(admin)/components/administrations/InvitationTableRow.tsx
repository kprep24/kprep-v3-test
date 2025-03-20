import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react'


interface InvitationTableRowProps {
    id: string;
    slNo: number;
    addedBy: {
        firstName: string;
    };
    firstName: string;
    role: string;
    onDelete: (id: string) => void;
}

function InvitationTableRow({ id, slNo, addedBy, firstName, role, onDelete }: InvitationTableRowProps) {
    return (
        <TableRow key={id}>
            <TableCell>{slNo}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{role}</TableCell>
            <TableCell>{addedBy.firstName}</TableCell>
            <TableCell>
                <Button onClick={() => onDelete(id)} variant={"link"} className='text-red-500'>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default InvitationTableRow
