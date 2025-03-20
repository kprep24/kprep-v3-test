"use client"

import React from 'react'
import CustomHeader from '../CustomeCardHeader.tsx/Header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import TableHeaderView from '@/components/Table/TableHeaderView'
import { useRouter } from 'next/navigation'
import useGetFormula from '../../api/formula_sheet/get-formula'
import TableBodyView from './TableBodyView'


export interface IFormula {
    title: string;
    type: "Mid" | "End";
    subject: { fullName: string };
    id: string
}


function FormulaPage() {
    const RESOURCES_HEADERS = ["Sl No", "Title", "Subject Name", "Content Type", "Action"];
    const router = useRouter();
    const formulas = useGetFormula();
    const formulaData: IFormula[] = formulas.data?.formulaSheets || [];
    return (
        <>
            <CustomHeader
                onClick={() => router.push("/formula-sheet/add")
                } buttonTitle='Add'
                title='Cheat Sheet or Formula'
            />
            <Card>
                <CardHeader>

                </CardHeader>
                <CardContent>
                    <Card>
                        <Table>
                            <TableHeaderView LIST={RESOURCES_HEADERS} />
                            <TableBody>
                                <TableBodyView formulas={formulas} formulaData={formulaData} />
                            </TableBody>
                        </Table>

                    </Card>
                </CardContent>
            </Card>
        </>
    )
}

export default FormulaPage
