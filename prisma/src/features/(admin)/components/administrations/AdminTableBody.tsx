"use client";

import { TableFallback } from "@/components/TableFallback";
import useGetAdmins from "../../api/administration/useGetAdmins";

import AdminTableRow from "./AdminTableRow";
import useAuthStore from "@/store/AuthStore";
import { useState } from "react";
import AlertDialogBox from "@/components/AlertBox/AlertDialogBox";
interface Admin {
    id: string;
    firstName: string;
    email: string;
    role: "SuperAdmin" | "Admin";
    createdAt: string;
    isBan: boolean;
}
export const TableBodyBox: React.FC<{ onEdit: (id: string) => void; }> = ({ onEdit }) => {


    const [banId, setBanId] = useState<string | null>(null);
    const [showDialog, setshowDialog] = useState<boolean>(false);

    const { data, isLoading, isError, error } = useGetAdmins();
    const admins: Admin[] = data || [];

    const { role, id } = useAuthStore();

    const colSpan = role === "SuperAdmin" ? 7 : 6;

    if (isError) return <TableFallback colSpan={colSpan} message={`Error: ${error?.message}`} />;
    if (isLoading) return <TableFallback colSpan={colSpan} message="Loading..." />;
    if (admins?.length === 0) return <TableFallback colSpan={colSpan} message="No data available" />;


    const handleBan = (id: string) => {
        setBanId(id);
        setshowDialog(true);
    }
    const handleConfirmBan = () => { }

    return <>
        {admins.map((admin, index) => (
            <AdminTableRow
                key={admin.id}
                index={index + 1}
                firstName={admin.firstName}
                email={admin.email}
                joiningDate={admin.createdAt}
                id={admin.id}
                role={admin.role}
                profile={admin.firstName[0]}
                // onDelete={onDelete}
                onEdit={onEdit}
                userRole={role}
                userId={id}
                onBan={handleBan}
                isBan={admin.isBan}
            />
        ))}
        <AlertDialogBox
            title="🚨 Confirm User Ban"
            description="⚠️ Are you sure you want to ban this user? Once banned, they will lose access to the platform and their account will be restricted."
            onConfirm={handleConfirmBan}
            setShow={() => setshowDialog(false)}
            show={showDialog}
        />

    </>

}