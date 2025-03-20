import React, { useState } from 'react'
import useGetCourses from '../../../api/course_brnach/useGetCourse';
import { TableFallback } from '@/components/TableFallback';
import CourseTableRow from './CourseTableRow';
import AlertDialogBox from '@/components/AlertBox/AlertDialogBox';
import { useDeleteCourse } from '../../../api/course_brnach/useDeleteCourse';
import { toast } from 'sonner';
import { useOpenSheet } from '../../../hooks/useOpenSheet';




export interface ICourse {
    id: string;
    name: string;
    type: "Bachelor" | "Master" | "Doctorate";

    duration: "TwoYears" | "ThreeYears" | "FourYears" | "FiveYears";
    addedBy: {
        firstName: string;
    };
}

function CourseTableBody() {

    const [deleteId, setDeleteId] = useState<null | string>(null);
    const [show, setShow] = useState<boolean>(false);


    const deleteMutation = useDeleteCourse();
    const { setEditId, onOpen, setIsBranchDialogOpen } = useOpenSheet();
    const { data, isLoading, isError, error } = useGetCourses();

    const coursesData: ICourse[] | [] = data;
    const colSpan = 6;

    if (isError) {
        return <TableFallback message={`Error: ${error}`} colSpan={colSpan} />
    }
    if (isLoading) {
        return <TableFallback message="Loading..." colSpan={colSpan} />
    }

    if (coursesData.length === 0) {
        return <TableFallback message="No courses available" colSpan={colSpan} />
    }

    const handleDelete = (id: string) => {
        setShow(true);
        setDeleteId(id);
    }
    const handleEdit = (id: string) => {
        setEditId(id);
        setIsBranchDialogOpen(false);
        onOpen(true);
    }

    const handleConfirmDelete = () => {
        if (deleteId) {
            deleteMutation.mutate({ id: deleteId }, {
                onSuccess: () => {
                    setShow(false);
                    setDeleteId(null);
                    toast("Course deleted successfully");
                },
                onError: () => {
                    toast.error("Error deleting course");
                    setShow(false);
                    setDeleteId(null);
                }
            })
        }
    }

    return (
        <>
            {coursesData.map((item, i) => {
                return <CourseTableRow
                    key={i}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    name={item.name}
                    duration={item.duration}
                    type={item.type}
                    id={item.id}
                    SlNo={i + 1}
                    addedBy={item.addedBy.firstName} />
            })}
            <AlertDialogBox
                title="Delete Course?"
                description="Are you sure you want to delete this course? Deleting it will also remove all associated branches. This action cannot be undone."
                onConfirm={handleConfirmDelete}
                show={show}
                setShow={() => setShow(false)}
            />
        </>
    )
}

export default CourseTableBody
