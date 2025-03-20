import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
// import { IUserList } from './UserTableBody'
import { Button } from '@/components/ui/button';
import { IUserList } from './UserTable';


interface IUserRow extends IUserList {

    slNo: number;
    onEdit: (id: string) => void;
    changeSubscription: (id: string) => void;
}

function UserRow({ name, id, email, createdAt, userDetails, slNo, onEdit, changeSubscription, isPremium }: IUserRow) {

    const date = new Date(createdAt).toLocaleDateString();
    const time = new Date(createdAt).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <TableRow>
            <TableCell>{slNo}</TableCell>
            <TableCell>{name.split(" ")[0]}</TableCell>
            <TableCell>
                {email.split("@")[0]}
            </TableCell>
            <TableCell>
                {userDetails?.year || "None"}
            </TableCell>
            <TableCell>
                {isPremium ? "Premium" : 'Free'}
            </TableCell>

            <TableCell>
                <Button disabled={!userDetails} onClick={() => changeSubscription(id)} variant={"link"} className='text-blue-500'>
                    Change Subscription
                </Button>

            </TableCell>
        </TableRow>
    )
}

export default UserRow
