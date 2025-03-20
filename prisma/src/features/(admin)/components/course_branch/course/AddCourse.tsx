"use client"

import SubmitButton from '@/components/button/SubmitButton'
import { Form } from '@/components/ui/form'

import { addCourseSchema } from '@/schema/course_branch.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputField, SelectField } from '../../InputField/InputFiled'
import { useAddCourse } from '../../../api/course_brnach/useAddCourse'
import { toast } from "sonner"
import { useOpenSheet } from '../../../hooks/useOpenSheet'
import { degreeType, duration } from '@/constants/course_branches'

interface CourseFormProps {
    defaultValues: z.infer<typeof addCourseSchema>  // define the type of defaultValues in the schema
}

function AddCourse({ defaultValues }: CourseFormProps) {

    const courseMutation = useAddCourse();
    const { onClosed } = useOpenSheet();
    // const { toast } = useToast()
    const form = useForm<z.infer<typeof addCourseSchema>>({
        resolver: zodResolver(addCourseSchema),
        defaultValues,
    })
    function onSubmit(values: z.infer<typeof addCourseSchema>) {
        courseMutation.mutate(values, {
            onSuccess: () => {
                toast("Course added successfully");
                onClosed();
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
                    disabled={courseMutation.isPending}
                />
                <SelectField
                    placeholder='Selcet duration'
                    name="duration"
                    options={duration}
                    label={'Duration'}
                    form={form.control}
                    disabled={courseMutation.isPending}
                />
                <SelectField
                    placeholder='Degree Type'
                    name="type"
                    options={degreeType}
                    label={'Degree Type'}
                    form={form.control}
                    disabled={courseMutation.isPending}
                />
                <SubmitButton
                    title='Add'
                    disabled={courseMutation.isPending}
                />

            </form>
        </Form>
    )
}

export default AddCourse
