import CourseBranch from '@/features/(admin)/components/course_branch/CourseBranch'
import { Metadata } from 'next/types'

import React from 'react'



export const metadata: Metadata = {
  title: 'Courses and Branches',
  description: 'manage courses and related branches',
}


export default function page() {
  return (
    <CourseBranch />
  )
}
