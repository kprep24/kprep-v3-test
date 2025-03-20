"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfo } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import getRepatedQnaList from "@/features/(main)/api/getRepatedQns";
import { FaLock } from "react-icons/fa";

export const subjectsList = [
  {
    id: 0,
    name: "Mathematics",
    year: "Two",
    description: "Topics include Calculus, Algebra, and more.",
    downloads: "2.3k",
    views: "5.2k",
    color: "from-pink-500 to-violet-500",
    url: "https://res.cloudinary.com/dgw0nurwl/image/upload/v1740347098/CC_NOTES_MID25_wonap3.pdf",
  },
  {
    id: 0,
    name: "Mathematics",
    year: "Two",
    description: "Topics include Calculus, Algebra, and more.",
    downloads: "2.3k",
    views: "5.2k",
    color: "from-pink-500 to-violet-500",
    url: "https://res.cloudinary.com/dgw0nurwl/image/upload/v1740347098/CC_NOTES_MID25_wonap3.pdf",
  },
  {
    id: 0,
    name: "Mathematics",
    year: "Two",
    description: "Topics include Calculus, Algebra, and more.",
    downloads: "2.3k",
    views: "5.2k",
    color: "from-pink-500 to-violet-500",
    url: "https://res.cloudinary.com/dgw0nurwl/image/upload/v1740347098/CC_NOTES_MID25_wonap3.pdf",
  },
  {
    id: 0,
    name: "Mathematics",
    year: "Two",
    description: "Topics include Calculus, Algebra, and more.",
    downloads: "2.3k",
    views: "5.2k",
    color: "from-pink-500 to-violet-500",
    url: "https://res.cloudinary.com/dgw0nurwl/image/upload/v1740347098/CC_NOTES_MID25_wonap3.pdf",
  },
  {
    id: 0,
    name: "Mathematics",
    year: "Two",
    description: "Topics include Calculus, Algebra, and more.",
    downloads: "2.3k",
    views: "5.2k",
    color: "from-pink-500 to-violet-500",
    url: "https://res.cloudinary.com/dgw0nurwl/image/upload/v1740347098/CC_NOTES_MID25_wonap3.pdf",
  },
  {
    id: 1,
    name: "Mathematics",
    year: "Four",
    description: "Topics include Calculus, Algebra, and more. 2",
    downloads: "2.3k",
    views: "5.2k",
    color: "from-pink-500 to-violet-500",
    url: "https://res.cloudinary.com/dgw0nurwl/image/upload/v1740347098/CC_NOTES_MID25_wonap3.pdf",
  },
];
interface IRPYQ {
  id: string;
  addedById: string;
  courseId: string;
  freemium: 'Free' | 'Premium';
  pyqType: 'Mid' | 'End';
  pyqUrl: string;
  subjectId: string;
  title: string;
  visibility: 'Public' | 'Private';
  year: 'One' | 'Two' | 'Three' | 'Four';
}

export default function MostRepeatedPYQs() {


  const { userType, year } = useUserInfo();
  const router = useRouter();
  const session = useSession();
  const questionList = getRepatedQnaList(session.data?.user.id!);
  const pqyList: IRPYQ[] = questionList.data || [];
  // const filterSubjectList = subjectsList.filter((subject) => subject.year == year);
  // console.log(filterSubjectList)
  // useEffect(() => {
  //   if (userType !== "Premium") {
  //     router.replace("/userboard"); // `replace` prevents going back to this page using browser back button
  //   }
  // }, [userType, router]);
  return (
    <div className="min-h-screen bg-white dark:bg-black/95 p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
            Most Repeated PYQs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Ace your exams with our curated collection of previous year questions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pqyList.map((subject, i) => (
            <a target="_blank" key={i} href={`${userType==="Free"?"/pricing":`/userboard/reapotedPdf?id=${subject.id}`}`} className="block">
              <Card className="group relative overflow-hidden border-0 bg-black/10 dark:bg-white/10 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div
                  className={`absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20 bg-gradient-to-br from-pink-500 to-violet-500`}
                />

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-black dark:text-white">{subject.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {/* {subject.} */}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <FileText className="h-20 w-20 text-black dark:text-white opacity-20" />
                </CardContent>

                <CardFooter className="flex justify-center border-t border-black/10 dark:border-white/10 px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-black bg-white dark:bg-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20"
                    onClick={(e) => {
                      e.preventDefault();
                      // window.open(subject.url, "_blank");
                    }}
                  >
                    <span>
                      {userType === "Free" && <FaLock className="w-5 h-5 right-6 top-5" />}
                    </span>Open
                  </Button>
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-500">
          Pro tip: Study these PYQs before your exam for better results!
        </div>
      </div>
    </div>
  );
}

