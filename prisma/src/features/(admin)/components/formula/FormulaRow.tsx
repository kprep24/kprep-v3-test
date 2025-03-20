"use client"

import React from 'react'
import { IFormula } from './FormulaPage'
import { TableCell, TableRow } from '@/components/ui/table'
import { EditButton } from '@/components/button/ActionButtons'

interface IFormulaRow extends IFormula {
    slNo: number
}


function FormulaRow({ title, type, subject, id, slNo }: IFormulaRow) {
    const handleEdit=(id:string)=>{}
    return (
        <TableRow>
            <TableCell>{slNo}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{subject.fullName}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>
                <EditButton onTap={()=>handleEdit(id)} title='Edit'></EditButton>
            </TableCell>

        </TableRow>

    )
}

export default FormulaRow
