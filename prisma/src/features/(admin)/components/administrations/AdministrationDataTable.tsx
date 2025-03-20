"use client"
import React from 'react'
import AdminTable from './AdminTable'
import InvitationTable from './InvitationTable'
import useGetInvitation from '../../api/administration/useGetInvitations';


export interface invitationAdminList {
    id: string;
    firstName: string;
    role: string;
    addedBy: {
        firstName: string
    }
}

function AdministrationDataTable() {

    const invitations = useGetInvitation();
    const userList: invitationAdminList[] = invitations.data || [];

    return (
        <div>
            {userList.length > 0 && <InvitationTable userList={userList}  />}
            <AdminTable />
        </div>
    )
}

export default AdministrationDataTable
