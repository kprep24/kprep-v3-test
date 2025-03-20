"use client"

import SubmitButton from '@/components/button/SubmitButton'
import { Form } from '@/components/ui/form'
import React from 'react'
import { InputField, SelectField } from '../../InputField/InputFiled'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addBranch } from '@/schema/course_branch.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import useGetCourses from '@/features/(admin)/api/course_brnach/useGetCourse'
import { toast } from 'sonner'
import { useAddBranche } from '@/features/(admin)/api/branche/useAddBranche'
import { useOpenSheet } from '@/features/(admin)/hooks/useOpenSheet'





interface IAddBranch {
    defaultValues: z.infer<typeof addBranch>
}

export interface IcourseList {
    value: string
    title: string;
    year: string,
}

function AddBranch({ defaultValues }: IAddBranch) {

    const courses = useGetCourses();
    const addCourse = useAddBranche();
    const { onClosed } = useOpenSheet()

    const isLoading: boolean = courses.isLoading || addCourse.isPending;
    const form = useForm<z.infer<typeof addBranch>>({
        resolver: zodResolver(addBranch),
        defaultValues,
    })
    function onSubmit(values: z.infer<typeof addBranch>) {
        addCourse.mutate({
            name: values.name,
            shortName: values.shortName,
            courseId: values.courseId,
        }, {
            onSuccess: () => {
                toast("Branch added successfully");
                form.reset();
                onClosed();
            },
            onError: (error: any) => {
                toast(error.message || "Failed to add branch");
            },
        })
    }

    const courseList: IcourseList[] = courses.data.map((item: any) => ({ value: item.id, title: item.name }));

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <InputField
                    name='name'
                    placeholder='Communication Engineering'
                    label='Branch Name'
                    form={form.control}
                    disabled={isLoading}
                />
                <InputField
                    name='shortName'
                    placeholder='CE'
                    label='Short Name'
                    form={form.control}
                    disabled={isLoading}
                />
                <SelectField
                    placeholder='Course'
                    name="courseId"
                    options={courseList}
                    label={'Select Course'}
                    form={form.control}
                    disabled={isLoading}
                />
                <SubmitButton
                    title='Add'
                    disabled={isLoading}
                />

            </form>
        </Form>
    )
}

export default AddBranch
