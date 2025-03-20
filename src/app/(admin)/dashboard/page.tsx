import { Metadata } from 'next';
import React from 'react'
import Row1 from '@/features/(admin)/components/dashboard/Row1';
import Row2 from '@/features/(admin)/components/dashboard/Row2';
import Dashboard from '@/features/(admin)/components/dashboard/Dashboard';


export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Effortlessly manage the website with precision and control.',
};
const page: React.FC = () => {

  return (
    <Dashboard />
  )
}

export default page;
