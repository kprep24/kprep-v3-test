import RootSessionProvider from "@/provider/RootSessionProvider";
import RootUserAuthentication from "@/provider/UserAuthentication";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";



export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <RootSessionProvider>
            <RootUserAuthentication>

                {children}
            </RootUserAuthentication>
        </RootSessionProvider>
    );
}