import z from "zod";


export const addPyqSchema = z.object({
    title: z.string().min(5).max(25),
    courseId: z.string().min(5),
    subjectId: z.string(),
    visibility: z.enum(['Public', 'Private']),
    pqyType: z.enum(['Mid', 'End', 'Supplement', 'Improvement']),
    freemium: z.enum(['Free', 'Premium']).optional(),
    semType: z.enum(['Spring', 'Autumn']),
    year: z.string(),
})