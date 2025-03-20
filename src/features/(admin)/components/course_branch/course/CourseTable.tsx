import { Card, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import React from 'react'
import CourseTableBody from './CourseTableBody'

function CourseTable() {
    return (


            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Sl No.</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Course Type</TableHead>
                        <TableHead>Added By</TableHead>
                        <TableHead>Opration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <CourseTableBody />
                </TableBody>
            </Table>


    )
}

export default CourseTable
