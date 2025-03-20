"use client"
import TableHeaderView from '@/components/Table/TableHeaderView'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import ResourceTableBodyBox, { IResource } from './ResourceTableBodyBox'
import WindowSelect from '../user/windowSelection'
import SubjectSelectInput from '../subjects/SubjectSelectInput'
import { SelectSubject } from './SelectSubject'
import useGetResources from '../../api/resources/useGetResource'
import { useGetSubjectByCourseId } from '../../api/subject/useGetSubjectByCourseId'
import useGetCourses from '../../api/course_brnach/useGetCourse'
import { IcourseList } from '../course_branch/branch/AddBranch'
import { Button } from '@/components/ui/button'
import PaginationController from '@/components/pagination/PaginationController'
import ResourcesFilter from './ResourcesFilter'

function ResourcesTable() {
    const RESOURCES_HEADERS = ["Sl No", "Title", "Subject Name", "Content Type", "freemium", "Action"];
    const [windowSize, setWindowSize] = useState<number>(10);
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const courses = useGetCourses();
    const courseId = courses.data && courses.data[0].id;
    // console.log(courseId)
    const subjects = useGetSubjectByCourseId(courseId);
    const subjectList: IcourseList[] = subjects.data && subjects.data.map((item: any) => {
        return { value: item.id, title: item.fullName, year: item.year }
    }) || [];

    const extractSubjectList = subjectList.filter((item) => item.year === selectedYear);
    const resources = useGetResources(page, selectedYear, subject, windowSize);
    // console.log(resources.data.resources)
    const resourcesData: IResource[] = resources.data && resources.data.resources || [];
    const totalPages = resources.data && resources.data.totalPages || 1;
    return (
        <Card>
            <CardHeader>
                <div className='flex gap-3 justify-end'>
                    <ResourcesFilter
                        windowSize={windowSize}
                        selectedYear={selectedYear}
                        setSubject={setSubject}
                        setWindowSize={setWindowSize}
                        setSelectedYear={setSelectedYear}
                        extractSubjectList={extractSubjectList} />
                </div>
            </CardHeader>
            <CardContent>
                <Card>
                    <CardContent>
                        <Table className='w-full'>
                            <TableHeaderView LIST={RESOURCES_HEADERS} />
                            <TableBody>
                                <ResourceTableBodyBox
                                    resources={resources}
                                    resourcesData={resourcesData}
                                />
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className='flex justify-center'>
                        <PaginationController
                            initialPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </CardFooter>
                </Card>
            </CardContent>
        </Card>
    )
}

export default ResourcesTable

