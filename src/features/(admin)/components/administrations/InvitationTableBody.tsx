"use client"

import React, { useState } from 'react'
import useGetInvitation from '../../api/administration/useGetInvitations';
import { TableFallback } from '@/components/TableFallback';
import InvitationTableRow from './InvitationTableRow';
import AlertDialogBox from '@/components/AlertBox/AlertDialogBox';
import { useDeleteInviteAdmin } from '../../api/administration/useDeleteInviteAdmin';
import { toast } from '@/hooks/use-toast';
import { invitationAdminList } from './AdministrationDataTable';




function InvitationTableBody({ userList }: { userList: invitationAdminList[] }) {



    const invitations = useGetInvitation();
    const deleteInvitationAdmin = useDeleteInviteAdmin();
    const [deleteId, setDeleteId] = useState<null | string>(null);
    const [show, setShow] = useState<boolean>(false);


    if (invitations.isError) {
        return <TableFallback message="An error occurred while fetching invitations. Please try again later." colSpan={5} />;
    }
    if (invitations.isLoading) {
        return <TableFallback message="Loading..." colSpan={5} />;
    }
    if (userList.length === 0) {
        return <TableFallback message="No invitations available" colSpan={5} />;
    }



    const handleDelete = (id: string) => {
        setDeleteId(id);
        setShow(true);
    }
    const handleConfirmDelete = () => {
        if (!deleteId) return;
        if (deleteId) {
            deleteInvitationAdmin.mutate({ id: deleteId }, {
                onSuccess: () => {
                    setShow(false);
                    setDeleteId(null);
                    toast({
                        description: "Invitation deleted successfully",
                    });
                },
                onError: (error) => {
                    setShow(false);
                    setDeleteId(null);
                    toast({
                        description: error.message || "Error deleting invitation",
                        variant: "destructive"
                    })
                }
            })
        }
    }


    return (
        <>
            {userList.map((invitation, i) => {
                return (
                    <InvitationTableRow
                        id={invitation.id}
                        firstName={invitation.firstName}
                        onDelete={handleDelete}
                        addedBy={invitation.addedBy}
                        slNo={i + 1}
                        role={invitation.role}
                    />
                )
            })}
            <AlertDialogBox
                title="Delete Invitation"
                description="Are you sure you want to delete this invitation? This action cannot be undone."
                show={show}
                onConfirm={handleConfirmDelete}
                setShow={() => setShow(false)}
            />
        </>
    )
}

export default InvitationTableBody
