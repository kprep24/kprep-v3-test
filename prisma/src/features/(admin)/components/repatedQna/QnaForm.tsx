"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddQna from './AddQna'
import { useSearchParams } from 'next/navigation'




function QnaForm() {


    const parsms = useSearchParams();
    const id = parsms.get('id');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Exam Questions</CardTitle>
                <CardDescription>Identify and upload the most commonly repeated questions to help students prepare effectively</CardDescription>
            </CardHeader>
            <CardContent>
                <AddQna defaultValues={{
                    title: "",
                    courseId: "",
                    subjectId: "",
                    visibility: "Public",
                    freemium: "Premium",
                    pqyType: "Mid",
                    year: "",
                    semType: "Autumn",
                }} />
            </CardContent>
        </Card>
    )
}

export default QnaForm
