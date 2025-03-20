import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { YtData } from './PlaylistView'
import { Youtube } from 'lucide-react';
import { DeleteButton, EditButton } from '@/components/button/ActionButtons';


interface IYtTableRow extends YtData {
    SlNo: number;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

function YTTableRow({ title, link, subject, id, SlNo, onDelete, onEdit }: IYtTableRow) {
    return (
        <TableRow>
            <TableCell>{SlNo}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{subject.fullName}</TableCell>
            <TableCell>
                <a target='_blank' href={link}>
                    <Youtube />
                </a>

            </TableCell>
            <TableCell>
                <EditButton onTap={() => onEdit(id)} />
                <DeleteButton onTap={() => onDelete(id)} />

            </TableCell>
        </TableRow>
    )
}

export default YTTableRow
