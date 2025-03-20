"use client"

import React from 'react'
import { IFormula } from './FormulaPage'
// import { TableRow } from '@/components/ui/table'
import FormulaRow from './FormulaRow'

function TableBodyView({ formulaData, formulas }: { formulaData: IFormula[], formulas: any }) {
console.log(formulaData)
    return (
        <>
            {formulaData && formulaData.map((item, i) => <FormulaRow slNo={i+1} id={item.id} title={item.title} subject={item.subject} type={item.type} />)}
        </>
    )
}

export default TableBodyView
