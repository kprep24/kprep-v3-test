import { z } from "zod";

const addSubjectSchema = z.object({
    name: z.string().min(2, "Subject name is required"),
    shortName: z.string().min(2, "Short name is required"),
    subjectCode: z.string().min(2, "Subject code is required"),
    credit: z.enum(["One", "Two", "Three", "Four"]),
    courseType: z.string().min(2, "Course Type is required"),
    year: z.enum(["One", "Two", "Three", "Four"]),
    scheme: z.enum(["SchemeA", "SchemeB"]),
    subjectType: z.enum(["Core", "Elective", "Lab"]),
    semBranches: z
        .array(
            z.object({
                semester: z.enum(["One", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"]),
                branch: z.string(),

            })
        ),
});

const subCourseIdSchema = z.object({
    year: z.enum(['One', 'Two', 'Three', 'Four']),
    courseId: z.string().min(1),
})


export { addSubjectSchema, subCourseIdSchema }