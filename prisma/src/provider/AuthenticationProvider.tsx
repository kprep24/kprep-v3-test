"use client";

import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

const RootAuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const path = usePathname();
    // console.log(path)
    const checkAuth = useCallback(async () => {
        try {
            let accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                await axios.post("/api/admin/refresh-token");

                accessToken = Cookies.get("accessToken");

            }
            setIsAuthenticated(!!accessToken);
        } catch (error) {
            console.error("Authentication check failed:", error);
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.replace(`/admin/sign-in`);
        } else if (path.startsWith("/admin/*")) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router, path]);

    if (isAuthenticated === null) return null;

    return <>{children}</>;
};

export default RootAuthenticationProvider;