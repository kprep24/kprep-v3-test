import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import CourseTable from './CourseTable'

function CourseCard() {
    return (
        <Card>


            <CardHeader>
                <CardTitle>Courses</CardTitle>
                <CardDescription>A comprehensive list of all available courses.</CardDescription>

            </CardHeader>
            <CardContent>


                <CourseTable />
            </CardContent>
        </Card>
    )
}

export default CourseCard
