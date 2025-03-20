"use client"

import SubmitButton from '@/components/button/SubmitButton'
import { Form } from '@/components/ui/form'

import { addCourseSchema } from '@/schema/course_branch.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputField, SelectField } from '../../InputField/InputFiled'
import { toast } from "sonner"
import { useOpenSheet } from '../../../hooks/useOpenSheet'
import { useEditCourse } from '../../../api/course_brnach/useEditCourse'
import { degreeType, duration } from '@/constants/course_branches'

interface EditCourseProps {
    defaultValues: z.infer<typeof addCourseSchema>
    id: string
    disabled: boolean
}

function EditCourse({ defaultValues, id, disabled }: EditCourseProps) {

    const courseMutation = useEditCourse();
    const { onClosed, setEditId } = useOpenSheet();
    // const { toast } = useToast()
    const form = useForm<z.infer<typeof addCourseSchema>>({
        resolver: zodResolver(addCourseSchema),
        defaultValues,
    })
    function onSubmit(values: z.infer<typeof addCourseSchema>) {
        courseMutation.mutate({ id: id, name: values.name, duration: values.duration, type: values.type }, {
            onSuccess: () => {
                toast("Course Modfied successfully");
                onClosed();
                setEditId("");
            },
            onError: (error: any) => {
                toast.error("Error adding course")
            },
        })
    }




    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <InputField
                    name='name'
                    placeholder='BTech CSE'
                    label='Course Name'
                    form={form.control}
                    disabled={courseMutation.isPending || disabled}
                />
                <SelectField
                    placeholder='Selcet duration'
                    name="duration"
                    options={duration}
                    label={'Duration'}
                    form={form.control}
                    disabled={courseMutation.isPending || disabled}
                />
                <SelectField
                    placeholder='Degree Type'
                    name="type"
                    options={degreeType}
                    label={'Degree Type'}
                    form={form.control}
                    disabled={courseMutation.isPending || disabled}
                />
                <SubmitButton
                    title='Update Course'
                    disabled={courseMutation.isPending || disabled}
                />

            </form>
        </Form>
    )
}

export default EditCourse;
