import FormulaPage from '@/features/(admin)/components/formula/FormulaPage'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Formula Sheets',
}

function page() {
    return (
        <FormulaPage />
    )
}

export default page
