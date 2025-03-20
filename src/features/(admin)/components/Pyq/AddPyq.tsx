"use client"

import { Form } from '@/components/ui/form';
import { addPyqSchema } from '@/schema/pyq.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputField, SelectField } from '../InputField/InputFiled';
import SubmitButton from '@/components/button/SubmitButton';
import { z } from 'zod';
import useGetCourses from '../../api/course_brnach/useGetCourse';
import { IcourseList } from '../course_branch/branch/AddBranch';
import { getDurationList } from '@/helpers/resources/getDurationList';
import useGetCourseById from '../../api/course_brnach/useGetCourseById';
import { NOTE_TYPE, NOTE_VISIBILITY } from '@/constants/resources.constraints';
import { useAddPyq } from '../../api/pyq/useAddPyq';
import { toast } from 'sonner';
import { useGetSubjects } from '@/hooks/use-get-subjects';
import { useGetDurationList } from '@/hooks/use-get-duration-lists';


interface IAddPyq {
    defaultValues: z.infer<typeof addPyqSchema>
}

function AddPyq({ defaultValues }: IAddPyq) {
    const form = useForm<z.infer<typeof addPyqSchema>>({
        resolver: zodResolver(addPyqSchema),
        defaultValues,
    });
    let courseId = null;
    courseId = form.watch("courseId");
    const addPyq = useAddPyq();
    // const course = useGetCourses();
    const [pyq, setPyq] = useState<File | null>(null);
    const [solution, setSolution] = useState<File | null>(null);
    const handlePyq = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB in bytes
                toast("File size must be 10MB or less.");
                return;
            }
            setPyq(file);
        }
    }
    const handleSol = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB in bytes
                toast("File size must be 10MB or less.");
                return;
            }
            setSolution(file);
        }
    }
    function onSubmit(values: z.infer<typeof addPyqSchema>) {
        if (!pyq) {

            toast("Please add pyq pdf");
            return
        };
        const formData = new FormData();
        formData.append("pyq", pyq);
        if (solution) formData.append("solution", solution);
        formData.append("title", values.title);
        formData.append("subjectId", values.subjectId);
        formData.append("visibility", values.visibility);
        formData.append("pqyType", values.pqyType);
        formData.append("freemium", values.freemium || "Premium");
        formData.append("courseId", values.courseId);
        formData.append("semType", values.semType);
        formData.append("year", values.year);
        addPyq.mutate(formData, {
            onSuccess: () => {
                toast("Successfully pyq uploaded");
                form.reset();
                setPyq(null);
                setSolution(null);
            },
            onError: (error) => {
                toast("Failed to upload")
            }
        });
    }

    const { courseList, durationList } = useGetDurationList(courseId);
    const extractSubjectList = useGetSubjects(courseId, form.watch("year"));
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <InputField
                    name='title'
                    placeholder='OS Mid Sem'
                    label='Title'
                    form={form.control}
                    disabled={addPyq.isPending}
                />
                <div className="first_row flex gap-4">
                    <SelectField
                        placeholder='Course'
                        name="courseId"
                        options={courseList && courseList}
                        label={'Select Course'}
                        form={form.control}
                        disabled={addPyq.isPending}
                    />
                    <SelectField
                        placeholder='choose duration'
                        name="year"
                        list={durationList}
                        label={'Select Year'}
                        form={form.control}
                        disabled={durationList.length == 0 || addPyq.isPending}
                    />
                    <SelectField
                        placeholder='Choose Subject'
                        name="subjectId"
                        options={extractSubjectList && extractSubjectList}
                        label={'Select Subject'}
                        form={form.control}
                        disabled={extractSubjectList.length == 0 || addPyq.isPending}
                    />
                </div>

                <div className="first_row flex gap-4">

                    <SelectField
                        placeholder='visibility'
                        name="visibility"
                        list={NOTE_VISIBILITY}
                        label={'Pyq Visibility'}
                        form={form.control}
                        disabled={addPyq.isPending}
                    />
                    <SelectField
                        placeholder='Semester Type'
                        name="semType"
                        list={['Spring', 'Autumn']}
                        label={'Semester Type'}
                        form={form.control}
                        disabled={addPyq.isPending}
                    />
                    <SelectField
                        placeholder='Mid/End'
                        name="pqyType"
                        list={['Mid', 'End', 'Supplement', 'Improvement']}
                        label={'Pyq Type'}
                        form={form.control}
                        disabled={addPyq.isPending}
                    />
                    <SelectField
                        placeholder='Free Or Premium'
                        name="freemium"
                        list={NOTE_TYPE}
                        label={'Freemium'}
                        form={form.control}
                        disabled={addPyq.isPending}
                    />

                </div>
                <div className="file_uploader_wrapper">
                    <div className="resources_upload_filed">
                        <input disabled={addPyq.isPending} type="file" accept="application/pdf" onChange={handlePyq} />

                        <label htmlFor="file">
                            <span className="upload_button">Select PYQ PDF</span>
                        </label>
                    </div>
                </div>
                <div className="file_uploader_wrapper">
                    <div className="resources_upload_filed">
                        <input disabled={addPyq.isPending} type="file" accept="application/pdf" onChange={handleSol} />

                        <label htmlFor="file">
                            <span className="upload_button">Select Soulution</span>
                        </label>
                    </div>
                </div>
                <SubmitButton
                    title='Add'
                    disabled={addPyq.isPending}
                />

            </form>
        </Form>
    )
}

export default AddPyq
