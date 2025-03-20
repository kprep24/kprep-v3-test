"use client"

import { Form } from '@/components/ui/form';
// import { addPyqSchema } from '@/schema/pyq.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputField, SelectField } from '../InputField/InputFiled';
import SubmitButton from '@/components/button/SubmitButton';
import { z } from 'zod';
import { toast } from 'sonner';
import { useGetSubjects } from '@/hooks/use-get-subjects';
import { useGetDurationList } from '@/hooks/use-get-duration-lists';
import { formulaSchema } from '@/schema/formula.schema';
import { useAddFormula } from '../../api/formula_sheet/add-formula';


interface IAddPyq {
    defaultValues: z.infer<typeof formulaSchema>
}

function AddFormula({ defaultValues }: IAddPyq) {
    const form = useForm<z.infer<typeof formulaSchema>>({
        resolver: zodResolver(formulaSchema),
        defaultValues,
    });
    let courseId = null;
    courseId = form.watch("courseId");
    const formula = useAddFormula();
    // const addPyq = useAddPyq();
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
    function onSubmit(values: z.infer<typeof formulaSchema>) {
        if (!pyq) {

            toast("Please add pyq pdf");
            return
        };
        const formData = new FormData();
        formData.append("file", pyq);
        // if (solution) formData.append("solution", solution);
        formData.append("title", values.title);
        formData.append("subjectId", values.subjectId);
        formData.append("year", values.year);
        formData.append("type", values.type);

        formula.mutate(formData, {
            onSuccess: () => {
                toast("Successfully pyq uploaded");
                form.reset();
                setPyq(null);
                setSolution(null);
            },
            onError: (error: any) => {
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
                    disabled={formula.isPending}
                />
                <div className="first_row flex gap-4">
                    <SelectField
                        placeholder='Course'
                        name="courseId"
                        options={courseList && courseList}
                        label={'Select Course'}
                        form={form.control}
                        disabled={formula.isPending}
                    />
                    <SelectField
                        placeholder='choose duration'
                        name="year"
                        list={durationList}
                        label={'Select Year'}
                        form={form.control}
                        disabled={durationList.length == 0 || formula.isPending}
                    />
                    <SelectField
                        placeholder='Choose Subject'
                        name="subjectId"
                        options={extractSubjectList && extractSubjectList}
                        label={'Select Subject'}
                        form={form.control}
                        disabled={extractSubjectList.length == 0 || formula.isPending}
                    />
                    <SelectField
                        placeholder='Mid/End'
                        name="type"
                        list={['Mid','End']}
                        label={'Mid/End'}
                        form={form.control}
                        disabled={ formula.isPending}
                    />
                </div>


                <div className="file_uploader_wrapper">
                    <div className="resources_upload_filed">
                        <input disabled={formula.isPending} type="file" accept="application/pdf" onChange={handlePyq} />

                        <label htmlFor="file">
                            <span className="upload_button">Upload Sheet</span>
                        </label>
                    </div>
                </div>

                <SubmitButton
                    title='Add'
                    disabled={formula.isPending}
                />

            </form>
        </Form>
    )
}

export default AddFormula
