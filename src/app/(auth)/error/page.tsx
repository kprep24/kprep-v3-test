"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, Terminal } from "lucide-react";

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const error = searchParams.get("error") || "An unexpected error occurred.";

    return (
        <div className="flex min-h-screen items-center justify-center  p-4">
            <div className="max-w-md w-full  shadow-lg rounded-2xl p-6">
                <Alert className="flex flex-col gap-2">
                    <div className="icon_bx">
                        <AlertCircle className="h-10 w-10 text-red-400" />
                    </div>
                    <div className="content">
                        <AlertTitle>Error occurred</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </div>
                    <Button onClick={()=>router.replace("/sign-in")} variant={'outline'}>
                        Back To Login
                    </Button>
                </Alert>

            </div>
        </div>
    );
}