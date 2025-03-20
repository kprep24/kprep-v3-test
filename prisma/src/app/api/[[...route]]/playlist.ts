import { getToken } from "@/helpers/middleware/getToken";
import { playlistSchema } from "@/schema/playlist.schema";
import { createPlaylist, getAllTopics, getPlaylists, getPlaylistsByYear } from "@/services/playlist.services";
import { zValidator } from "@hono/zod-validator";
import { SubjectYear } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";



export const playlist = new Hono()
    .post("/admin", zValidator("json", playlistSchema), async (c) => {
        try {
            // console.log("tiig playlist")
            const { subjectId, title, link, courseId, chName, noOfVideos, rating } = c.req.valid("json");
            const { userId } = getToken(c);
            // console.log(subjectId, title, link, courseId )
            await createPlaylist({ courseId, link, title, subjectId, userId, chName, noOfVideos, rating });
            return c.json({ message: "Successfully Created" }, 201)
        } catch (error: any) {
            console.log(error)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/admin", async (c) => {
        try {
            const playlists = await getPlaylists();
            return c.json({ playlists }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/", zValidator("query", z.object({
        year: z.enum(['One', 'Two', 'Three', 'Four']),
        branchId: z.string(),
        courseId: z.string(),
    })), async (c) => {
        try {
            const { branchId, courseId, year } = c.req.valid("query");
            const playlists = await getPlaylistsByYear({ year, branchId, courseId });
            return c.json({ playlists }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/playlists", async (c) => {
        try {
            const query = await c.req.query();
            let subId;
            if (query.subjectId === null) {
                subId = undefined;
            } else {
                subId = query.subject
            }
            const year = query.year as SubjectYear;
            const playlists = await getAllTopics(subId, year);
            // console.log(playlists)
            return c.json({ playlists }, 200)
        } catch (error: any) {
            console.log(error)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })