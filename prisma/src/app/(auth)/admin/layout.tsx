import RootAuthenticationProvider from "@/provider/AuthenticationProvider";
import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div><RootAuthenticationProvider>{children}</RootAuthenticationProvider></div>;
}
