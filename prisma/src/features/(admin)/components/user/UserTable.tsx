"use client"

import TableHeaderView from '@/components/Table/TableHeaderView'
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'
import React from 'react'
import UserTableBody from './UserTableBody'
import { Button } from '@/components/ui/button'
export interface IUserList {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    isPremium: boolean
    userDetails?: {
        year: string
    }
}

interface UserTableProps {
    userList: IUserList[],
    users: any;
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    totalPages: number;
}

function UserTable({ userList, users, setPage, page, totalPages }: UserTableProps) {

    return (
        <Table className='w-full'>
            <TableHeaderView LIST={['Sl No', 'First Name', 'Roll No', 'Year', 'Status', 'Action']} />
            <TableBody>
                <UserTableBody userList={userList} users={users} />
            </TableBody>
           
        </Table>
    )
}

export default UserTable
