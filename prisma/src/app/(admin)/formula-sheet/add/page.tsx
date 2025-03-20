import FormulaForm from '@/features/(admin)/components/formula/FormulaForm'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: 'Add Formulas',
}

function page() {
    return (
        <FormulaForm />
    )
}

export default page
