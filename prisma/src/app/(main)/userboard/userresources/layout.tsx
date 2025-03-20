export const metadata = {
  title: "K Prep | Resources",
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
    title: "K Prep | Resources",
    description:
      "Access a comprehensive academic support system for KIIT students, including notes, PYQs, solutions, cheat sheets, online tutorials, faculty details, an SGPA calculator, and more.",
      url: "https://kprep.in/userboard/userresources",
      siteName: "K Prep",
    images: [
      {
        url: "https://kprep.in/userboard/userresources",
        width: 1200,
        height: 630,
        alt: "K-Prep | Your Ultimate Study Buddy ",
      },
    ],
    type: "website",
  },
};

export default function BooksellLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
