import TableHeaderView from '@/components/Table/TableHeaderView'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import React from 'react'
import TableBodyView from './TableBodyView'

function TableView() {
    return (
        <Card>
            <CardHeader>
                {/* <CardTitle>PYQS</CardTitle>
                <CardDescription>List of all pyqs</CardDescription> */}
            </CardHeader>
            <CardContent>
                <Card>
                    <Table>
                        <TableHeaderView LIST={['Sl No', 'Title', 'Type', 'Subject', 'Opration']} />
                        <TableBody>
                            <TableBodyView />
                        </TableBody>
                    </Table>
                </Card>
            </CardContent>
        </Card>
    )
}

export default TableView
