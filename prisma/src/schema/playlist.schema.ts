

import z from "zod";


export const playlistSchema = z.object({
    title: z.string().min(5).max(25),
    courseId: z.string().min(5),
    subjectId: z.string(),
    year: z.string(),
    link: z.string().url().refine((val) => val.includes("youtube"), {
        message: "Link must be a YouTube URL",
    }),
    noOfVideos: z.string().min(1),
    chName: z.string().min(5).max(25),
    rating: z.string().max(5),
});