"use client"

import TableHeaderView from '@/components/Table/TableHeaderView'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import React, { useState } from 'react'
import TableBodyView, { IPyqs } from './TableBodyView'
import PaginationController from '@/components/pagination/PaginationController'
import ResourcesFilter from '../resources/ResourcesFilter'
import useGetCourses from '../../api/course_brnach/useGetCourse'
import { useGetSubjectByCourseId } from '../../api/subject/useGetSubjectByCourseId'
import { IcourseList } from '../course_branch/branch/AddBranch'
import useGetPyqs from '../../api/pyq/useGetPyqs'

function TableView() {
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
    const pyqs = useGetPyqs(page, selectedYear, subject, windowSize);
    const PyqList: IPyqs[] = pyqs.data && pyqs.data.pyqs || [];
    const totalPages = pyqs.data && pyqs.data.totalPages || 1;

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
                        <Table>
                            <TableHeaderView LIST={['Sl No', 'Title', 'Pyq Info', 'AddedBy', 'Opration']} />
                            <TableBody>
                                <TableBodyView PyqList={PyqList} pyqs={pyqs} />
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className='flex justify-center'><PaginationController totalPages={totalPages} initialPage={page} onPageChange={setPage} /></CardFooter>
                </Card>
            </CardContent>

        </Card>
    )
}

export default TableView
