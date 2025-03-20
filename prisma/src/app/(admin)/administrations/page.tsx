import Administrations from '@/features/(admin)/components/administrations/Administration';
import { Metadata } from 'next/types';
import React from 'react'


export const metadata: Metadata = {
  title: 'Administration',
  description: 'manage admins and their roles',
}



const page: React.FC = () => {
  return (
    <Administrations />
  )
}

export default page;