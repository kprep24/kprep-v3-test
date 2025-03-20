import React from 'react'
import AddCourse from './AddCourse'
import { useOpenSheet } from '../../../hooks/useOpenSheet'
import useGetCourseById from '../../../api/course_brnach/useGetCourseById'
import { CourseTableBody } from './CourseTableRow'
import EditCourse from './EditCourse'
import { Card, CardContent } from '@/components/ui/card'




type IcourseData = Pick<CourseTableBody, "name" | "duration" | "type" | "id">

function CourseForm() {

    const { editId } = useOpenSheet();
    const { data, isLoading, isError, error } = useGetCourseById(editId);
    const courseData: IcourseData = data;


    if (isError) {
        return <Card>
            <CardContent>
                <p className="text-danger">Error: {error.message || "Error Occured"}</p>
            </CardContent>
        </Card>
    }


    return (
        <div className='mt-3'>
            {editId && courseData ? <EditCourse
                id={courseData.id}
                disabled={isLoading}
                defaultValues={{
                    name: courseData.name,
                    type: courseData.type,
                    duration: courseData.duration,
                }}
            /> : <AddCourse
                defaultValues={{
                    name: "",
                    type: "Bachelor",
                    duration: "FourYears",
                }}
            />}
        </div>
    )
}

export default CourseForm
