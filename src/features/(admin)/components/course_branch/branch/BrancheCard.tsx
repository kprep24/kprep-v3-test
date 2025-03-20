import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import BrancheTable from './BrancheTable'

function BrancheCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Branches</CardTitle>
                <CardDescription>A comprehensive list of all available branches.</CardDescription>

            </CardHeader>
            <CardContent>

                <BrancheTable />
            </CardContent>
        </Card>
    )
}

export default BrancheCard
