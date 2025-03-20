import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import React from 'react'
import InvitationTableBody from './InvitationTableBody'
import { invitationAdminList } from './AdministrationDataTable'

function InvitationTable({ userList }: { userList: invitationAdminList[] }) {
    return (
        <Card className='my-3'>
            <CardHeader>
                <CardTitle>
                    Invitations List
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Sl No.
                            </TableHead>
                            <TableHead>
                                First Name
                            </TableHead>
                            <TableHead>
                                Role
                            </TableHead>
                            <TableHead>
                                Added By
                            </TableHead>
                            <TableHead>
                                Operation
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <InvitationTableBody userList={userList} />
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default InvitationTable
