"use client"

import React from 'react'
import AddSubjectForm from './AddSubjectForm'
import { ICourse } from '../course_branch/course/CourseTableBody';
import useGetCourses from '../../api/course_brnach/useGetCourse';
import { EDUCATION_YEARS, SCHEMES, SEMESTER_YEARS, SUBJECT_CREDITS, SUBJECT_TYPE } from '@/constants/subjectDetails';
import useGetBranches from '../../api/branche/useGetAllBranches';
import { useSearchParams } from 'next/navigation';
import useGetSubjectBySubjectId from '../../api/subject/useGetSubjectBySubjectId';
import EditSubjectForm from './EditSubjectForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



interface IBranch extends ICourse {
    courseId: string;
}

interface ISubject {

    fullName: string;
    shortName: string;
    code: string;
    credit: "One" | "Two" | "Three" | "Four";
    scheme?: "SchemeA" | "SchemeB";
    year: "One" | "Two" | "Three" | "Four";
    subjectType: "Core" | "Elective" | "Lab"
    subjectDetails: {
        branchId: string[]
        semester: string[]
        courseId: string
    }
}


interface IcombinedArray {
    branch: string,
    semester: "One" | "Second" | "Third" | "Fourth" | "Fifth" | "Sixth" | "Seventh" | "Eighth"

}

function SubjectForm() {


    const branches = useGetBranches();
    const params = useSearchParams();
    const subjectId = params.get("id");
    const { data, isLoading, isError, error } = useGetCourses();
    const subject = useGetSubjectBySubjectId(subjectId);
    const subjectData: ISubject = subject.data;
    const coursesData: ICourse[] | [] = data;
    const branchesData: IBranch[] | [] = branches.data;

    const branchIds = subjectData?.subjectDetails.branchId;
    const semesters = subjectData?.subjectDetails.semester;

    const combinedArray: IcombinedArray[] = branchIds && branchIds.map((branchId, index) => ({
        branch: branchId,
        semester: semesters[index] as "One" | "Second" | "Third" | "Fourth" | "Fifth" | "Sixth" | "Seventh" | "Eighth"
    }))
    console.log(combinedArray)
    const COURSES = coursesData && coursesData.map((item) => ({ title: item.name, value: item.id }));
    const BRANCHES = branchesData && branchesData.map((item) => ({ title: item.name, value: item.id, courseId: item.courseId }));
    if (subject.isLoading) { return <div>Loading......</div> }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{subjectId && subject.data ? "Edit Subject" : "Add Subject"}</CardTitle>
                <CardDescription>{subjectId && subject.data ? "Modify an existing subject." : "Add a new subject."}</CardDescription>
            </CardHeader>
            <CardContent>
                {subjectId && subject.data ? <EditSubjectForm
                    isLoading={isLoading || branches.isLoading}
                    COURSES={COURSES}
                    SEMESTER_YEARS={SEMESTER_YEARS}
                    EDUCATION_YEARS={EDUCATION_YEARS}
                    SUBJECT_CREDITS={SUBJECT_CREDITS}
                    SCHEMES={SCHEMES}
                    BRANCHES={BRANCHES}
                    SUBJECT_TYPE={SUBJECT_TYPE}
                    defaultValues={{
                        name: subject.data && subjectData.
                            fullName,
                        shortName: subjectData.shortName,
                        courseType: subjectData.subjectDetails.courseId,
                        year: subjectData.year,
                        subjectCode: subjectData.code,
                        credit: subjectData.credit,
                        scheme: subjectData.year === "One" && subjectData.scheme ? subjectData.scheme :
                            "SchemeA",
                        subjectType: subjectData.subjectType,
                        semBranches: combinedArray,
                    }} /> : <AddSubjectForm
                    isLoading={isLoading || branches.isLoading}
                    COURSES={COURSES}
                    SEMESTER_YEARS={SEMESTER_YEARS}
                    EDUCATION_YEARS={EDUCATION_YEARS}
                    SUBJECT_CREDITS={SUBJECT_CREDITS}
                    SCHEMES={SCHEMES}
                    BRANCHES={BRANCHES}
                    SUBJECT_TYPE={SUBJECT_TYPE}
                    defaultValues={{
                        name: "",
                        shortName: "",
                        courseType: "",
                        year: "Three",
                        subjectCode: "",
                        credit: "Four",
                        scheme: "SchemeA",
                        subjectType: "Core",
                        semBranches: [{
                            branch: "",
                            semester: "One",
                        }],
                    }} />}
            </CardContent>
        </Card>
    )
}

export default SubjectForm
