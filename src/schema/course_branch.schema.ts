import { z } from "zod";

export const COURSE_TYPE = ["Bachelor", "Master", "Doctorate"] as const;
export const COURSE_DURATION = ["TwoYears", "ThreeYears", "FourYears", "FiveYears"] as const;

const addCourseSchema = z.object({
    name: z
        .string()
        .min(3, "Course name must be at least 3 characters long.")
        .max(15, "Course name must not exceed 15 characters."),
    type: z.enum(COURSE_TYPE, {
        errorMap: () => ({ message: `Course type must be one of: ${COURSE_TYPE.join(", ")}.` }),
    }),
    addedById: z.string().min(1).optional(),
    duration: z.enum(COURSE_DURATION, {
        errorMap: () => ({
            message: `Course duration must be one of: ${COURSE_DURATION.join(", ")} years.`,
        }),
    }),

});

const addBranch = z.object({
    name: z
        .string()
        .min(3, "Branch name must be at least 3 characters long.")
        .max(25, "Branch name must not exceed 15 characters."),
    shortName: z
        .string()
        .min(2, "Short name must be at least 3 characters long.")
        .max(8, "Short name must not exceed 8 characters."),
    courseId: z
        .string()
        .min(1, "Course ID must not be empty."),
});

export { addCourseSchema, addBranch };
