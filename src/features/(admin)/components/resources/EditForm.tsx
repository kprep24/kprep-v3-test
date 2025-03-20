"use client"

import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { InputField, SelectField, TextAreaField } from '../InputField/InputFiled'
import SubmitButton from '@/components/button/SubmitButton'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addResources } from '@/schema/resources.schema';
import { IcourseList } from '../course_branch/branch/AddBranch'
import useGetCourses from '../../api/course_brnach/useGetCourse'
import { useGetSubjectByCourseId } from '../../api/subject/useGetSubjectByCourseId'
import useGetCourseById from '../../api/course_brnach/useGetCourseById'
import { useAddResource } from '../../api/resources/useAddResource'
import { CONTENT_TYPE, NOTE_TYPE, NOTE_VISIBILITY } from '@/constants/resources.constraints'
import { getDurationList } from '@/helpers/resources/getDurationList'



interface IAddForm {
    defaultValues: z.infer<typeof addResources>;
}





function EditForm({ defaultValues }: IAddForm) {





    const resources = useAddResource();

    const form = useForm<z.infer<typeof addResources>>({
        resolver: zodResolver(addResources),
        defaultValues,
    });


    let courseId = null;
    courseId = form.watch("courseId");
    const { data, isLoading, isError, error } = useGetCourses();
    const subjects = useGetSubjectByCourseId(courseId);
    const courseDetails = useGetCourseById(courseId);

    const courseDuration = courseDetails && courseDetails.data?.duration;
    let durationList = getDurationList(courseDuration);


    const [file, setFile] = useState<File | null>(null);
    function onSubmit(values: z.infer<typeof addResources>) {


        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("subjectId", values.subjectId);
        formData.append("noteVisibility", values.noteVisibility);
        formData.append("noteType", values.noteType);
        formData.append("freemium", values.freemium || "Premium");
        formData.append("courseId", values.courseId);
        formData.append("year", values.year);
        resources.mutate(formData, {
            onSuccess: () => {
                alert("Data saved successfully")
            },
            onError: (error) => {
                alert("Error saving data")
            }
        });
    }
    const courseList: IcourseList[] = data && data.map((item: any) => ({ value: item.id, title: item.name }));
    const subjectList: IcourseList[] = subjects.data && subjects.data.map((item: any) => {
        return { value: item.id, title: item.fullName, year: item.year }
    }) || [];
 
    const extractSubjectList = subjectList.filter((item) => item.year === form.watch("year"));

    // const freePremiumControl = form.watch("noteType") === "Handwritten";
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <InputField
                    name='title'
                    placeholder='Fundamental of OS'
                    label='Resources Title'
                    form={form.control}
                    disabled={isLoading}
                />
                <TextAreaField
                    name='description'
                    placeholder='Use resources description and important keywords'
                    label='Resources Description'
                    form={form.control}
                    disabled={isLoading}
                />
                <div className="first_row flex gap-4">
                    <SelectField
                        placeholder='Course'
                        name="courseId"
                        options={courseList && courseList}
                        label={'Select Course'}
                        form={form.control}
                        disabled={isLoading}
                    />
                    <SelectField
                        placeholder='choose duration'
                        name="year"
                        list={durationList}
                        label={'Select Year'}
                        form={form.control}
                        disabled={durationList.length == 0}
                    />
                    <SelectField
                        placeholder='Choose Subject'
                        name="subjectId"
                        options={extractSubjectList && extractSubjectList}
                        label={'Select Subject'}
                        form={form.control}
                        disabled={subjectList.length == 0}
                    />
                </div>
                <div className="first_row flex gap-4">

                    <SelectField
                        placeholder='visibility'
                        name="noteVisibility"
                        list={NOTE_VISIBILITY}
                        label={'Note Visibility'}
                        form={form.control}
                        disabled={isLoading}
                    />
                    <SelectField
                        placeholder='Handwritten/Slides'
                        name="noteType"
                        list={CONTENT_TYPE}
                        label={'Content Type'}
                        form={form.control}
                        disabled={isLoading}
                    />
                    <SelectField
                        placeholder='Free Or Premium'
                        name="freemium"
                        list={NOTE_TYPE}
                        label={'Freemium'}
                        form={form.control}
                        // disabled={!freePremiumControl}
                    />
                </div>
                <div className="resources_upload_filed">
                    <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />

                    <label htmlFor="file">
                        <span className="upload_button">Choose File</span>
                    </label>
                </div>
                <SubmitButton
                    title='Add'
                    disabled={resources.isPending}
                />

            </form>
        </Form>
    )
}

export default EditForm
