"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function RootUserAuthentication({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (status === "loading") return; // Prevent premature redirection

        const isUserboardRoute = pathName.startsWith("/userboard");

        if (session && !isUserboardRoute) {
            // Allow navigation normally
            return;
        } else if (!session && isUserboardRoute) {
            router.replace("/sign-in");
        }
    }, [session, status, pathName, router]);

    if (status === "loading") return null; // Avoid flickering

    return <>{children}</>;
}

export default RootUserAuthentication;
