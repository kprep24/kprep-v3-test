import ReportFeedback from '@/features/(admin)/components/ReportFeedback/ReportFeedback'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Feedbacks',
}


export default function page() {
  return (
    <ReportFeedback />
  )
}
