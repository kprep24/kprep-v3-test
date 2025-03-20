"use client"

import React from 'react'
import CustomHeader from '../CustomeCardHeader.tsx/Header';
import { useRouter } from 'next/navigation';
import TableView from './TableView';

function Qna() {

    const router = useRouter();
    const handleClick = () => {
        router.push('/repated-question/add')
    }

    return (
        <>
            <CustomHeader
                onClick={handleClick}
                title='Repated Questions'
                buttonTitle={'Add Questions'}
            />
            <TableView />
        </>
    )
}

export default Qna
