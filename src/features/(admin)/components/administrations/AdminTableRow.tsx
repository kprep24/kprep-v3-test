"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { DeleteButton, EditButton } from "@/components/button/ActionButtons";

interface AdminTableProps {
    firstName: string;
    email: string;
    role: "SuperAdmin" | "Admin";
    id: string;
    // onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    index: number;
    profile: string;
    joiningDate: string;
    userRole: string;
    userId: string;
    onBan: (id: string) => void;
    isBan: boolean;
}

function AdminTableRow({
    firstName,
    email,
    role,
    id,
    onEdit,
    index,
    profile,
    joiningDate,
    onBan,
    userRole,
    userId,
    isBan
}: AdminTableProps) {
    const joindate = new Date(joiningDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    });

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>
                <Avatar>
                    <AvatarFallback>{profile}</AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell>{firstName}{isBan && <span>(Blocked)</span>}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                {
                    role === "SuperAdmin" ? <span className="bg-[#333333] p-1 rounded-md">{role}</span> : role
                }
            </TableCell>
            <TableCell>{joindate}</TableCell>
            {userRole === "SuperAdmin" && (
                <TableCell>
                    <EditButton disabled={userId === id} onTap={() => onEdit(id)} />
                    {/* <EditButton color="#F37199" disabled={userId === id} title="Block" onTap={() => onBan(id)} /> */}
                </TableCell>
            )}
        </TableRow>
    );
}

export default AdminTableRow;
