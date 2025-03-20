"use client"

import React from 'react'
import AdministrationDataTable from './AdministrationDataTable';
import AdministrationForm from './AdministrationForm';
import CustomHeader from '../CustomeCardHeader.tsx/Header';
import { useOpenSheet } from '../../hooks/useOpenSheet';
import useAuthStore from '@/store/AuthStore';

function Administrations() {


    const { onOpen } = useOpenSheet()
    const { role } = useAuthStore();

    return (
        <div className='mt-2'>
            {role === "SuperAdmin" &&
                <CustomHeader
                    title='Administrations'
                    buttonTitle='Add Administration'
                    onClick={() => onOpen(true)}
                />
            }
            <AdministrationDataTable />
            <AdministrationForm />
        </div>
    )
}

export default Administrations;
