"use client";

import FreePdf from "@/components/UserDashboard/FreePdf";
import { GraduationCap, ClipboardList, BookOpen, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useGetUserById from "@/features/(main)/api/useGetUserById";
import { useUserInfo } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { QuickCards } from "@/components/UserDashboard/QuickCards";
import { FileText, MessageCircle, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MostRepeatedPYQs from "@/components/UserDashboard/MostRepeatedPYQs";
interface UserDetails {
  id: string;
  userId: string;
  branchId: string;
  courseId: string;
  isLocked: boolean;
  isVerified: boolean;
  modifyCount: number;
  semester: string;

  year: string;
  Branch: {
    shortName: string;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
  userDetails?: UserDetails;
  isPremium: "Free" | "Premium";
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const userInfo = useGetUserById(userId!);
  const userName = session?.user?.name?.split(" ")[0] || "Guest";
  
  // Motivational quotes array
  const motivationalQuotes = [
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "Your time is limited, don't waste it living someone else's life.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Don't watch the clock; do what it does. Keep going.",
    "Quality is not an act, it is a habit.",
    "The best way to predict the future is to create it."
  ];
  
  // State for current motivational quote
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  const userBio: User | undefined = userInfo.data;
  console.log(userBio)
  useEffect(() => {
    if (status === "loading" || userInfo.isLoading) {
      return;
    }
    else if (userBio?.userDetails) {
      updateUserInfo({
        branchId: userBio.userDetails.branchId,
        email: userBio.email,
        isVerified: true,
        name: userBio.name,
        semester: userBio.userDetails.semester,
        year: userBio.userDetails.year,
        userId: userBio.userDetails.userId,
        isLocked: userBio.userDetails.isLocked,
        branchName: userBio.userDetails.Branch.shortName,
        joinDate: userBio.createdAt,
        userType: userBio?.isPremium ? "Premium" : "Free",
        image:userBio.image
      });
    }
  }, [userBio, router]);
  const { updateUserInfo, isVerified } = useUserInfo();
  useEffect(() => {
    setTimeout(() => {
      if (status === "loading") {
        return;
      }
      else if (status === "authenticated" && isVerified === false) {
        router.push("/userboard/userprofile");
      }
    }, 2000)
  }, [isVerified, router]);
  const [currentTime, setCurrentTime] = useState("");
  const { userType } = useUserInfo();
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Effect for rotating quotes every 10 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
    }, 10000); // 10 seconds
    
    return () => clearInterval(quoteInterval);
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
      hour < 17 ? "Good afternoon" :
        hour < 21 ? "Good evening" : "Good night";


  const handleFeedback = () => router.push("/userboard/feedback")
  // console.log(userType)
  return (
    <div className="space-y-8 p-4">
      {/* Header Section */}
      <div className="flex items-start flex-row-reverse gap-4 lg:text-right p-8 rounded-xl bg-gradient-to-br from-[#fbfaf9] to-[#f6f6f3] dark:from-[#030712] dark:to-[#111827] border justify-between">
        <div className="space-y-4">
          <div className="text-sm">{currentTime}</div>
          <div>
            <h2 className="text-[32px] font-medium">{greeting},</h2>
            <h2 className="text-4xl font-bold dark:text-usersidebar-dark-text text-usersidebar-light-link pb-4 dark:drop-shadow-[0_0_10px_rgba(0,0,255,0.85)] drop-shadow-[0_0_10px_rgba(0,150,0,0.85)]">
              {userName}
            </h2>
            <p>
              {userType === "Free" ? "Free User" : <span className="text-yellow-500">Premium User</span>}
            </p>
          </div>
          <div className="space-y-1 ">
            {/* <p className="text-base text-gray-600 dark:text-gray-300">
              Did you do anything productive today?
            </p> */}
            <p className="text-base italic font-medium text-gray-600 dark:text-gray-300">
              "{currentQuote}"
            </p>
          </div>
        </div>
        <div className="w-80 hidden lg:block">
          <img src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1739961345/MASCOT-removebg-preview_1_kpcqqm.png" alt="User Image" className="w-full flex dark:hidden" />
          <img src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1739961694/MASCOT__3__1_B-removebg-preview_1_ka5uan.png" alt="User Image" className="w-full hidden dark:flex" />

        </div>
      </div>
      {/* Quick cards */}
      <div className="bg-[#fff8c6ce] dark:bg-[#212121df] py-6 px-6 rounded-xl">
        <h1 className="sm:text-2xl text-xl text-black dark:text-white font-bold mb-5">Quick Links</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
          <QuickCards title="To Do List" subtitle="Schedule your tasks" icon={<ClipboardList width={40} height={40} />} link="/userboard/to-do" />
          <QuickCards title="Exam Schedule" subtitle="View upcoming exams" icon={<GraduationCap width={40} height={40} />} link="/userboard/exams-schedule" />
          <QuickCards title="Holiday List" subtitle="Check out your holidays" icon={<Calendar width={40} height={40} />} link="/userboard/holiday-list" />
          <QuickCards title="Book Selling" subtitle="Sell your books" icon={<BookOpen width={40} height={40} />} link="/userboard/bookselling" />


        </div>
      </div>
      {/* Most repeated PYQs */}
      {<MostRepeatedPYQs />}

      <div className="w-full  text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-4 text-gradient bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
          🌟 Connect & Grow Together!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg font-medium text-justify">
          Join our WhatsApp groups to clear doubts, interact with seniors & juniors, and get all the info you need. Feel free to connect and share feedback! 💡
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button onClick={handleFeedback} className="flex items-center gap-3 px-6 py-3 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-base sm:text-lg font-semibold shadow-lg transition-all">
            <MessageCircle size={20} /> <span>Provide Feedback</span>
          </Button>

          <Link href="https://chat.whatsapp.com/KN1COgR9BkJLGXZ3nFjEBp"   >      <Button className="flex items-center gap-3 px-6 py-3 bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-base sm:text-lg font-semibold shadow-lg transition-all">
            <Users size={20} /> <span>Join WhatsApp Community</span>
          </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
