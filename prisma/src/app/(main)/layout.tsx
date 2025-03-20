// import type { Metadata } from "next";
import "@/app/globals.css";
import RootUserAuthentication from "@/provider/UserAuthentication";
import RootSessionProvider from "@/provider/RootSessionProvider";
import RootClientProvider from "@/provider/QueryClientProvider";
import { Toaster } from "@/components/ui/sonner"
// import DisableContextMenu from "@/provider/DisableContext";
import SecurityLayer from "@/provider/DisableContext";
import { Comfortaa } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import NextTopLoader from "nextjs-toploader";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const comfortaa = Comfortaa({ subsets: ["latin"] });


export const metadata = {
  title: "K Prep | Your Ultimate Study Buddy",
  description:
    "K-Prep is the go-to platform for KIIT students, offering class notes, previous year papers, solutions, cheat sheets, tutorials, course details, faculty contacts, an SGPA calculator, and a focus mode for productive learning.",
  keywords: [
    "K-Prep",
    "KIIT Notes",
    "Previous Year Papers",
    "PYQ Solutions",
    "Academic Resources",
    "SGPA Calculator",
    "Focus Mode",
    "Cheat Sheets",
    "Online Tutorials",
    "Faculty Details",
  ],
  openGraph: {
    title: "K Prep | Your Ultimate Study Buddy",
    description:
      "Access a comprehensive academic support system for KIIT students, including notes, PYQs, solutions, cheat sheets, online tutorials, faculty details, an SGPA calculator, and more.",
    url: "https://kprep.in",
    siteName: "K Prep",
    images: [
      {
        url: "https://kprep.in/", // Ensure this image is publicly accessible
        width: 1200,
        height: 630,
        alt: "K Prep | Your Ultimate Study Buddy",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.className} antialiased`}
      >
        <RootSessionProvider>
          <RootUserAuthentication>
            <RootClientProvider>
              <SecurityLayer> 
              <NextTopLoader
                showSpinner={false}
                color="#799670"
              />
              {children}
              <Analytics />
              </SecurityLayer>
            </RootClientProvider>
          </RootUserAuthentication>
        </RootSessionProvider>

        <Toaster />
      </body>
    </html>
  );
}
