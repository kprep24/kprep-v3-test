"use client";

import React, { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { InputField, SelectField } from "../InputField/InputFiled";
import SubmitButton from "@/components/button/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { addSubjectSchema } from "@/schema/subject.schema";
import { useAddSubject } from "../../api/subject/useAddSubject";
import { toast } from "sonner";
import { FileImage } from "lucide-react";
import { IAddSubjectForm } from "../../types/AddSubjectForm.types";
// Define Zod Schema



function AddSubjectForm({ defaultValues, SEMESTER_YEARS, COURSES, EDUCATION_YEARS, SUBJECT_CREDITS, BRANCHES, SCHEMES, isLoading, SUBJECT_TYPE }: IAddSubjectForm) {



    const addSubject = useAddSubject();
    const form = useForm<z.infer<typeof addSubjectSchema>>({
        resolver: zodResolver(addSubjectSchema),
        defaultValues,
    });

    //selected branch based on course type
    const SELECTED_BRANCHES: any = BRANCHES && BRANCHES.filter((item: any) => item.courseId
        === form.watch("courseType"));

    //select semester based on year
    const EXTRACT_SELECTED_SEMESTERS = SEMESTER_YEARS && SEMESTER_YEARS.filter((item) =>
        item.title === form.watch("year")
    );
    const SELECTED_SEMESTERS = EXTRACT_SELECTED_SEMESTERS[0].semesters.map((item) => ({ value: item.value, title: item.title }))

    const isFirstYear = form.watch("year") === "One";


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "semBranches",
    });

    function onSubmit(values: z.infer<typeof addSubjectSchema>) {
        const isValid = values.semBranches.every(value => {
            return value.branch && value.branch !== ""
        });

        const selectedYear = form.watch("year");
        if ((selectedYear === "Two" || selectedYear === "Three" || selectedYear === "Four") && !isValid) {
            toast("Please select semester and related branches");
            return;
        }
        addSubject.mutate(values, {
            onSuccess: () => {
                toast("Subject added successfully");
                form.reset();
            },
            onError: () => {
                toast("Failed to add subject");
            }
        });
    }










    const loading: boolean = isLoading;
    const fileUpload = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);


    const handleHangoutBtn = () => {
        if (fileUpload.current) {
            fileUpload.current?.click();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {/* course hangout upload */}

                <input
                    hidden
                    type="file"
                    ref={fileUpload}
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Button type="button" onClick={handleHangoutBtn} className="flex gap-2" variant={'outline'}>
                    <FileImage />
                    Upload Course Hangout
                </Button>



                {/* course hangout upload */}

                {/* Subject Details */}
                <div className="row flex gap-2">
                    <InputField
                        disabled={loading}
                        name="name" placeholder="Communication Engineering" label="Subject Full Name" form={form.control} />
                    <SelectField
                        placeholder="Select Course"
                        disabled={loading} options={COURSES} label={"Course Type"} form={form.control} name={"courseType"} />
                </div>
                <div className="row flex gap-2">
                    <InputField name="shortName" placeholder="Comm Eng" label="Short Name" form={form.control} disabled={loading} />
                    <InputField name="subjectCode" placeholder="CSE101" label="Subject Code" form={form.control} disabled={loading} />
                </div>
                <div className="row flex gap-2">
                    <SelectField disabled={loading} options={SUBJECT_CREDITS} label={"Credit"} form={form.control} name={"credit"} />
                    <SelectField disabled={loading} options={EDUCATION_YEARS} label={"Year"} form={form.control} name={"year"} />
                    <SelectField disabled={loading} options={SUBJECT_TYPE} label={"Subject Type"} form={form.control} name={"subjectType"} />
                </div>

                {/* Dynamic Semester & Branch Selection */}
                {form.watch("courseType") && <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 relative">
                            {/* Semester Selection */}
                            {
                                isFirstYear ? <>
                                    <SelectField
                                        disabled={loading}
                                        width="w-[40%]"
                                        options={SCHEMES}
                                        label={'Scheme'}
                                        form={form.control}
                                        placeholder="Select Semester"
                                        name={`semBranches.${index}.scheme`}
                                    />
                                </> : <>
                                    <SelectField
                                        disabled={loading}
                                        width="w-[40%]"
                                        options={SELECTED_SEMESTERS
                                        }
                                        label={'Semester Selection'}
                                        placeholder="Select Branch"

                                        form={form.control}
                                        name={`semBranches.${index}.semester`}
                                    />

                                    {/* Branch Selection */}
                                    <SelectField
                                        disabled={loading}
                                        width="w-[40%]"
                                        options={SELECTED_BRANCHES}
                                        label={'Branch Selection'}
                                        form={form.control}
                                        name={`semBranches.${index}.branch`}
                                    />

                                </>
                            }
                            {/* Remove Button */}
                            <Button className="absolute right-5 top-[90%] translate-y-[-90%]" type="button" onClick={() => remove(index)} variant="destructive">
                                ✕
                            </Button>
                        </div>
                    ))}
                </div>}

                {/* Add More Semester-Branch */}
                {form.watch("courseType") && <Button type="button" onClick={() => append({ semester: "One", branch: "" })}>
                    + Add Semester & Branch
                </Button>
                }


                <SubmitButton title="Add Subject" disabled={loading} />
            </form>
        </Form>
    );

}
export default AddSubjectForm;
