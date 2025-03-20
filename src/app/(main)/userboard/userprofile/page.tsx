'use client';

import UserCard from '@/components/UserDashboard/userProfile/UserCard';
import UserForm from '@/components/UserDashboard/userProfile/userForm';
import { useUserInfo } from '@/store/AuthStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { useEffect, useState } from 'react';

const ProfilePage = () => {


  const { data } = useSession();
  const { isVerified, name, email, year, semester, joinDate, branchName, userType } = useUserInfo();
  const router = useRouter();

  const userInfo = data?.user;
  // console.log(isVerified, name, email, year, semester, joinDate, branchName, userType)
  useEffect(() => {
    setTimeout(() => {
      if (isVerified === true) {
        router.push("/userboard");
      }
    },1000)
  }, [isVerified, router]);

  return (
    <div className="flex items-center  justify-center w-full h-screen text-black">
      <div className=" register rounded-xl w-full max-w-xl">


        {isVerified ? <UserCard
          name={name}
          email={email}
          branch={branchName}
          userType={userType}
          joiningTime="2023-09-01"
          semester={semester}
          avatarUrl={data?.user.image}
        /> : <UserForm
          defaultValues={{
            name: userInfo && userInfo?.name || "",
            email: userInfo?.email || "",
            branchId: "",
            year: "One",
            semester: "Second",
          }}
        />}
      </div>
    </div>
  );
};

export default ProfilePage;
