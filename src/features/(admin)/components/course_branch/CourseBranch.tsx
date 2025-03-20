"use client"
import React from 'react'
import CustomHeader from '../CustomeCardHeader.tsx/Header'
import SheetProvider from '@/components/SheetProvider/SheetProvider'
import { useOpenSheet } from '../../hooks/useOpenSheet'
import CourseForm from './course/CourseForm'
import BranchForm from './branch/BranchForm'
import CourseCard from './course/CourseCard'
import BrancheCard from './branch/BrancheCard'


function CourseBranch() {


    const { onOpen, editId, isBranchDialogOpen, setIsBranchDialogOpen, dialogType, setDialogType, setEditId } = useOpenSheet();

    const handleOpenSheet = () => {
        setDialogType("Course");
        setEditId(undefined)
        setIsBranchDialogOpen(false);
        onOpen(true)
    }
    const handleOpenSheet2 = () => {
        setDialogType("Branch");
        setEditId(undefined)
        setIsBranchDialogOpen(true);
        onOpen(true);
    }


    const title = dialogType === "Branch" && !editId ? "Add Branch" : dialogType === "Branch" && editId ? "Edit Branch" : dialogType === "Course" && editId ? "Edit Course" : "Add New Course";
    const description = !editId ? "Fill in the details below to create a new course. Ensure all fields are accurate before submission." : "Modify the details below to update the course information. Ensure all changes are accurate before saving.";

    return (
        <>
            <CustomHeader
                title='Course & Branch'
                buttonTitle='Add Course'
                onClick={handleOpenSheet}
                secondButton='Add Branch'
                secondBtnClick={handleOpenSheet2}
            />
            <SheetProvider
                side='left'
                title={title}
                description={description}
            >
                {isBranchDialogOpen ? <BranchForm /> : <CourseForm />}
            </SheetProvider>
            <CourseCard />
            <BrancheCard />
        </>
    )
}

export default CourseBranch
