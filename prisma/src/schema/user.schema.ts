import z from "zod";


const userSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().min(2, "Email is required"),
    branchId: z.string().min(1),
    year: z.enum(["One", "Two", "Three", "Four"]),
    semester: z.enum(["One", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"]),
})

export { userSchema };