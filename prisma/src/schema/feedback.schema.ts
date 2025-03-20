import { z } from "zod";

const feebackFormSchema = z.object({
    category: z.enum(["Request for New Feature", "Feedback", "Report a Bug"]),
    text: z.string().min(5, {
        message: "Feedback text is required and should be at least 5 characters long"
    })
});


export { feebackFormSchema };