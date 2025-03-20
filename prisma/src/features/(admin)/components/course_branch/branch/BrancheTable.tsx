import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import React from 'react'
import BrancheTableBody from './BrancheTableBody'

function BrancheTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Sl No.</TableHead>
                    <TableHead>Branch Name</TableHead>
                    <TableHead>Short Name</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead>Opration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <BrancheTableBody />
            </TableBody>
        </Table>
    )
}

export default BrancheTable
