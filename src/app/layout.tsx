// "use client"

import './globals.css'
import { PomodoroProvider } from "@/components/promodoro/promodoroContext"
// import { useEffect } from 'react'
import { Comfortaa } from "next/font/google";

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
        alt: "K-Prep - The Best Learning Platform for KIIT Students",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add a debug message to confirm single instance of provider
  // useEffect(() => {
  //   console.log('Root PomodoroProvider mounted - this should appear only once');
  // }, []);

  return (
    <html lang="en">
      <PomodoroProvider>
        <body className={`${comfortaa.className} antialiased`} >
          {children}
        </body>
      </PomodoroProvider>
    </html>
  )
}
