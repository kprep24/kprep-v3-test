"use client"

import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Calendar, Mail, BadgeIcon as IdCard, GraduationCap, BookOpen } from "lucide-react"
import useGetUserById from "@/features/(main)/api/useGetUserById"
import { useSession } from "next-auth/react"
import { useUserInfo } from "@/store/AuthStore"
import { useRouter } from "next/navigation"


export function getYear(year: string): string {
    switch (year) {
        case "One": return "1";
        case "Two": return "2";
        case "Three": return "3";
        case "Four": return "4";
        default: return "1"; // Default to "1" if no match is found
    }
}

export default function UserProfile() {
    const { data } = useSession();
    const router = useRouter();
    const userId = data?.user?.id;
    // const userInfo = useGetUserById(userId!);
    const { isVerified, name, email, year, semester, joinDate, branchName, userType, image } = useUserInfo();
    // console.log(isVerified, name, email, year, semester, joinDate, branchName, userType)
    // Mock user data - in a real app, this would come from your backend
    useEffect(() => {

        if (!isVerified) {
            router.replace("/userboard");
        }

    }, [router, isVerified])
    const [user, setUser] = useState({
        name: "Alex Johnson",
        rollNo: "CS2023-456",
        email: "alex.johnson@example.com",
        status: "premium", // or "free"
        joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        profilePicture: "/placeholder.svg?height=100&width=100", // Placeholder for demo
    })

    // In a real application, you would fetch the user's Gmail profile picture
    // This would require OAuth integration with Google

    // console.log(semester)
    function getSemester(sem: string): string {
        switch (sem) {
            case "First": return "1";
            case "Second": return "2";
            case "Third": return "3";
            case "Fourth": return "4";
            case "Fifth": return "5";
            case "Sixth": return "6";
            case "Seventh": return "7";
            case "Eighth": return "8";
            default: return "1"; // Default to "1" if no match is found
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md overflow-hidden shadow-lg">
                <div className="relative h-32 bg-gradient-to-r from-primary to-primary/60">
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                            <AvatarImage src={image} alt={name} />
                            <AvatarFallback className="bg-primary text-3xl text-white dark:text-slate-800 font-semibold">
                                {name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <CardHeader className="pt-20 text-center">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <div className="mt-2">
                        {userType !== "Free" ? (
                            <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-white shadow-md hover:from-amber-500 hover:to-amber-700">
                                <Crown className="mr-1 h-4 w-4" /> Premium
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="px-3 py-1">
                                Free
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 pb-6">
                    <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-center space-x-3 border-b dark:border-b
                          pb-3">
                            <IdCard className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Roll Number</p>
                                <p className="font-medium">{email.split("@")[0]}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 border-b py-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Email Address</p>
                                <p className="font-medium">{email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 border-b py-3">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">File</p>
                                <p className="font-medium">Computer Science</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 border-b py-3">
                            <GraduationCap className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Year & Semester</p>
                                <p className="font-medium">
                                    Year {getYear(year)}, Semester {getSemester(semester)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 pt-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Joined</p>
                                <p className="font-medium">{formatDistanceToNow(joinDate, { addSuffix: true })}</p>
                            </div>
                        </div>
                    </div>

                    {userType !== "Free" && (
                        <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
                            <div className="flex items-center">
                                <Crown className="mr-2 h-5 w-5 text-amber-500" />
                                <p className="font-medium text-amber-700 dark:text-amber-400">Premium benefits active</p>
                            </div>
                            <p className="mt-1 text-sm text-amber-600 dark:text-amber-300">
                                Enjoy exclusive features and priority support
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

