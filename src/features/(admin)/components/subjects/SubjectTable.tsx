"use client"

import TableHeaderView from '@/components/Table/TableHeaderView';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'
import React, { useState } from 'react';
import SubjectTableBodyBox, { IsubjectData } from './SubjectTableBodyBox';
import { Input } from '@/components/ui/input';
import SubjectSelectInput from './SubjectSelectInput';
import { useGetSubjects } from '../../api/subject/useGetSubjects';
import { Button } from '@/components/ui/button';
import PaginationController from '@/components/pagination/PaginationController';



function SubjectTable() {

    const SUBJECTS_HEADERS = ["Sl No.", "Subject Name", "Credit", "Code", "Resources", "Pyqs", "Actions"];
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const subjects = useGetSubjects(selectedYear, searchText, page);
    // console.log(subjects)
    const subjectData: IsubjectData[] = subjects.data?.subjects?.subjects || [];
    const totalPages = subjects.data?.subjects.totalPages || 1;

    // console.log(subjectData)





    return (
        <Card>
            <CardHeader>
                <div className="wrapper flex justify-between">
                    <div className="w-3/12">
                        <Input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            type="text"
                            placeholder="Subject Code"
                        />
                    </div>
                    <div className="w-3/12">
                        <SubjectSelectInput
                            selectedYear={selectedYear}
                            setSelectedYear={setSelectedYear}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Card>
                    <Table className='w-full'>
                        <TableHeaderView LIST={SUBJECTS_HEADERS} />
                        <TableBody>
                            <SubjectTableBodyBox
                                subjects={subjects}
                                subjectData={subjectData}
                            />
                        </TableBody>
                      
                    </Table>
                </Card>
            </CardContent>
            <CardFooter className='flex justify-center'>
                <PaginationController
                    initialPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage} />
            </CardFooter>
        </Card>
    )
}

export default SubjectTable
