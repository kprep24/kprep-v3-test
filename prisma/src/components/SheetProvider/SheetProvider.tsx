"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useOpenSheet } from "@/features/(admin)/hooks/useOpenSheet";

interface AdministrationFormProps {
    title: string;
    description: string;
    children: React.ReactNode;
    side: "top" | "right" | "bottom" | "left"
}


function SheetProvider({ title, description, children, side }: AdministrationFormProps) {

    const { open, onClosed, id } = useOpenSheet();


    return (
        <Sheet open={open} onOpenChange={onClosed}>
            <SheetContent side={side}>
                <SheetHeader>
                    <SheetTitle>
                        {title}
                    </SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>

    )
}

export default SheetProvider;
