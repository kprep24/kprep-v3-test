import Resources from '@/features/(admin)/components/resources/Resources'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
  title: 'Resources',
  description: 'Manage Resources',
}


export default function page() {
  return (
    <Resources />
  )
}
