import Pyq from '@/features/(admin)/components/Pyq/Pyq'
import Qna from '@/features/(admin)/components/repatedQna/Qna'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
  title: 'Repeated Questions',
  description: 'Manage Questions',
}



export default function page() {
  return (
    <Qna />
  )
}
