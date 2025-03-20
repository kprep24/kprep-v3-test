import z from "zod"

const addResources = z.object({
    title: z.string().min(5).max(25),
    description: z.string().min(10),
    courseId: z.string().min(5),
    subjectId: z.string().min(5),
    year: z.string(),
    noteVisibility: z.enum(['Public', 'Private']),
    noteType: z.enum(['Handwritten', 'Slide']),
    freemium: z.enum(['Free', 'Premium']).optional(),
})


export { addResources };