"use client"

import React from 'react'
import CustomHeader from '../CustomeCardHeader.tsx/Header'
import { useRouter } from 'next/navigation';
import SubjectTable from './SubjectTable';

function Subject() {


    const router = useRouter();

    const handleAddSubject = () => {
        router.push('/subjects/add')
    }



    return (
        <div>
            <CustomHeader title='Subjects' buttonTitle='Add Subject' onClick={handleAddSubject} />
            <SubjectTable />
        </div>
    )
}

export default Subject
