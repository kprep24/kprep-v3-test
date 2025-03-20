import User from '@/features/(admin)/components/user/User'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Management',
  description: 'manage users and their accounts',
}


export default function page() {
  return (
    <User />
  )
}
