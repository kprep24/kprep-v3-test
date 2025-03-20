import React, { useState } from 'react'
import { useGetUsers } from '../../api/users/useGetUsers'
import { TableFallback } from '@/components/TableFallback';
import UserRow from './UserRow';
import { useUpdateSubcrption } from '../../api/users/useUpdateSubcrption';
import { toast } from 'sonner';
import { IUserList } from './UserTable';




function UserTableBody({ userList, users }: { userList: IUserList[], users: any }) {
    const userModified = useUpdateSubcrption();

    if (users && users.isError) {
        return <TableFallback colSpan={6} message={users.error.message} />
    }
    if (users && users.isLoading) {
        return <TableFallback message='Loading...' colSpan={6} />
    }
    if (userList && userList.length === 0) {
        return <TableFallback colSpan={6} message={"No user abalable"} />
    }


    const handleSubscription = (id: string) => {
        userModified.mutate({ id }, {
            onSuccess: () => {
                toast("Change Subscription");
            },
            onError: (error) => {
                toast(error.message);
            },

        })
    }
    const handleEdit = (id: string) => {
        userModified.mutate({ id })
    }
    console.log(userList)
    return (
        <>
            {userList && userList.map((user, i) => <UserRow
                isPremium={user.isPremium}
                onEdit={handleEdit}
                changeSubscription={handleSubscription}
                name={user.name}
                key={i}
                email={user.email}
                createdAt={user.createdAt}
                slNo={i + 1}
                id={user.id}
                userDetails={user.userDetails}
            />)}

        </>
    )
}

export default UserTableBody
