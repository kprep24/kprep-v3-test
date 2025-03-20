import React from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TableBodyBox } from './AdminTableBody';
import useAuthStore from '@/store/AuthStore';
import { useOpenSheet } from '../../hooks/useOpenSheet';


const AdminTable: React.FC = () => {


    const { role } = useAuthStore();
    const { onOpen, setId } = useOpenSheet();

  

    const handleEdit = (id: string) => {
        onOpen(true);
        setId(id);
    };

    return (
        <Card className='my-3'>
            <CardHeader>
                <CardTitle>
                    Admins List
                </CardTitle>

            </CardHeader>
            <CardDescription>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sl No</TableHead>
                            <TableHead>Profile</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Join</TableHead>
                            {role === "SuperAdmin" && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableBodyBox
                       
                            onEdit={handleEdit}
                        />
                    </TableBody>


                </Table>
            </CardDescription>
        </Card>
    )
}

export default AdminTable;
