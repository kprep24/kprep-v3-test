import Profile from '@/features/(admin)/components/profile/Profile';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: 'User Profile',
}

const Page: React.FC = () => {
  return (
    <Profile />
  );
};

export default Page;
