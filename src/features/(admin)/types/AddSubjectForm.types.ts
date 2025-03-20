import { addSubjectSchema } from "@/schema/subject.schema";
import { z } from "zod";

export interface IAddSubjectForm {
    defaultValues: z.infer<typeof addSubjectSchema>;
    SEMESTER_YEARS: Array<{ title: string; semesters: Array<{ title: string; value: string }>; }>;
    EDUCATION_YEARS: Array<{ title: string; value: string }>;
    SUBJECT_CREDITS: Array<{ title: string; value: string }>;
    COURSES: Array<{ title: string; value: string }>;
    BRANCHES: Array<{ title: string; value: string }>;
    SCHEMES: Array<{ title: string; value: string }>;
    SUBJECT_TYPE: Array<{ title: string; value: string }>;
    isLoading: boolean;
}
