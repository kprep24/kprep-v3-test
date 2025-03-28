import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import DashboardLayout from "@/provider/DashboardLayout";
import { AdminThemeProvider } from "@/provider/AdminThemeProvider";
import RootClientProvider from "@/provider/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner"
import RootAuthenticationProvider from "@/provider/AuthenticationProvider";
import NextTopLoader from 'nextjs-toploader';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <AdminThemeProvider>
          <DashboardLayout>
            <RootClientProvider>
              <RootAuthenticationProvider>
                {/* <DisableContextMenu> */}
                <NextTopLoader />
                {children}
                {/* </DisableContextMenu> */}
              </RootAuthenticationProvider>
            </RootClientProvider>
          </DashboardLayout>
        </AdminThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
