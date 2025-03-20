"use client";

import AlertDialogBox from "@/components/AlertBox/AlertDialogBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useLogout from "@/features/(auth)/api/useLogout";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react"



const Profile: React.FC = () => {


    const [show, setShow] = useState<boolean>(false);

    const logout = useLogout();
    const router = useRouter();
    const handleLogout = () => {
        setShow(true);
    }

    const handleConfirmLogout = () => {
        logout.mutate()
        setShow(false);

        router.replace("/admin/sign-in");
    }

    const { firstName, lastName, email, role, joiningDate } = useAuthStore()
    let joinDate = new Date(joiningDate).toLocaleDateString()
    return (<Card>
        <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
                Some information about your profile
            </CardDescription>
        </CardHeader>
        <CardContent className="">
            <div className="profileInformation">
                <div className="name">
                    Name: {firstName + " " + lastName}
                </div>
                <div className="email">
                    Email: {email}
                </div>
                <div className="role">
                    Role: {role}
                </div>
                <div className="join">
                    Join: {joinDate}
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex gap-3">
            <Button>
                Change Password
            </Button>
            <Button onClick={handleLogout} variant={"destructive"}>
                Log Out
            </Button>
        </CardFooter>
        <AlertDialogBox
            title="Confirm Logout"
            description="Are you sure you want to log out? You will need to sign in again to access your account."
            show={show}
            setShow={() => setShow(false)}
            onConfirm={handleConfirmLogout}
        />
    </Card>);
}

export default Profile;