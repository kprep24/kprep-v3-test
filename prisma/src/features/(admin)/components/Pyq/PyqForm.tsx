"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddPyq from './AddPyq'
import { useSearchParams } from 'next/navigation'
import useGetPyqById from '../../api/pyq/useGetPyqById'
import { IPyq } from '../../types/pyq.types'
import EditPyq from './EditPyq'




function PyqForm() {


    const params = useSearchParams();
    const pyqId = params.get("pyqId");
    const pyq = useGetPyqById(pyqId);
    const pyqData: IPyq = pyq.data || "";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add PYQS</CardTitle>
                <CardDescription>Fill up the form carefully</CardDescription>
            </CardHeader>
            <CardContent>
                {pyqId && pyqData ? <EditPyq defaultValues={{
                    title: pyqData.title,
                    courseId: pyqData.courseId,
                    subjectId: pyqData.subjectId,
                    visibility: pyqData.visibility,
                    freemium: pyqData.freemium,
                    pqyType: pyqData.pyqType,
                    year: pyqData.year,
                    semType: pyqData.semType,
                }} /> : <AddPyq defaultValues={{
                    title: "",
                    courseId: "",
                    subjectId: "",
                    visibility: "Public",
                    freemium: "Premium",
                    pqyType: "Mid",
                    year: "",
                    semType: "Autumn",
                }} />}
            </CardContent>
        </Card>
    )
}

export default PyqForm
