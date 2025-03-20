import Pyq from '@/features/(admin)/components/Pyq/Pyq'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Pyqs',
  description: 'Manage Pyqs',
}




export default function page() {
  return (
    <Pyq />
  )
}
