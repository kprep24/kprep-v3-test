"use client"

import React from 'react'
import CustomHeader from '../CustomeCardHeader.tsx/Header';
import { useRouter } from 'next/navigation';
import TableView from './TableView';

function Pyq() {

    const router = useRouter();
    const handleClick = () => {
        router.push('/pyqs/add')
    }

    return (
        <>
            <CustomHeader onClick={handleClick} title='PYQS' buttonTitle={'Add Pyqs'} />
            <TableView />
        </>
    )
}

export default Pyq
