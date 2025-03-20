"use client"

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import useAuthStore from '@/store/AuthStore';
import { LockOpen, Lock, FileText, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface IResourceTableRow {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    SlNo: number;
    id: string;
    shortName: string;
    title: string;
    contentType: string;
    freemium: "Premium" | "Free";
    onFreePremimum: (id: string) => void;
    visibility: "Public" | "Private";
    onToogleVisibility: (id: string) => void;
}

function ResourceRow({ onEdit, onDelete, freemium, contentType, title, shortName, id, SlNo, onFreePremimum, visibility, onToogleVisibility }: IResourceTableRow) {
    const { role } = useAuthStore();


    return (
        <TableRow>
            <TableCell>{SlNo}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{shortName}</TableCell>
            <TableCell>{contentType}</TableCell>
            <TableCell>
                {freemium !== "Premium" ? <LockOpen className="text-green-500" /> : <Lock className="text-red-500" />}
            </TableCell>
            <TableCell className="flex gap-2">

                <Button disabled={ role !== "SuperAdmin"} onClick={() => onEdit(id)} variant="link" className="text-blue-500">
                    <FileText />
                </Button>


                {role === "SuperAdmin" && <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFreePremimum(id)}>
                            {freemium === "Free" ? "Make Premium" : "Make Free"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onToogleVisibility(id)}>
                            {visibility === "Public" ? "Make Private" : "Make Public"}
                        </DropdownMenuItem>
                        {role === "SuperAdmin" && (
                            <DropdownMenuItem onClick={() => onDelete(id)} className="text-red-500">
                                Delete
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>}
            </TableCell>
        </TableRow>
    );
}

export default ResourceRow;
