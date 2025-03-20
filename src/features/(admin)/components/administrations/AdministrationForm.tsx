"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useOpenSheet } from "../../hooks/useOpenSheet"
import AddNewAdministration from "./AddNewAdministrationForm"
import useAdminById from "../../api/administration/useAdminById";
import EditAdminstrationForm from "./EditAdministrationForm";



function AdministrationForm() {

    const { open, onClosed, id } = useOpenSheet();
    const admin = useAdminById(id);
    const title = id ? "Edit Administrator" : "Add New Administrator";
    const description = id ? "Modify the administrator's details by updating the form below." : "Add a new administrator to the system by completing the form below."

    return (
        <Sheet open={open} onOpenChange={onClosed}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        {title}
                    </SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {id && admin.data ? <EditAdminstrationForm
                    defaultValues={{
                        isBan: admin.data.isBan,
                        role: admin.data.role
                    }}
                    id={id}
                    disabled={admin.isLoading}
                /> : <AddNewAdministration defaultValues={{
                    firstName: "",
                    email: "",
                    role: "Admin"
                }} />}
            </SheetContent>
        </Sheet>

    )
}

export default AdministrationForm
