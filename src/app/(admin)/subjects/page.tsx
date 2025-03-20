import CourseBranch from '@/features/(admin)/components/course_branch/CourseBranch'
import Subject from '@/features/(admin)/components/subjects/Subject'
import { Metadata } from 'next/types'
import React from 'react'


export const metadata: Metadata = {
  title: 'Subjects',
  description: 'Manage Subject',
}


export default function page() {
  return (
    <Subject/>
  )
}
