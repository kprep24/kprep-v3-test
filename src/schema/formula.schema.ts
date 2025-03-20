import { z } from "zod";
import { playlistSchema } from "./playlist.schema";



export const formulaSchema = playlistSchema.omit({ link: true }).extend({
    type: z.enum(['Mid', 'End'])
})