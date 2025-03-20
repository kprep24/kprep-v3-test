import { createPyq, getPyqById, getPyqs, UpadtePyq } from "@/services/pyq.services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const pyq = new Hono()
    .post("/add-pyq", async (c) => {
        try {
            const body = await c.req.parseBody();
            // console.log("===========>",body)
            await createPyq(body, c);
            return c.json({ message: "Resources added successfully" }, 201);
        } catch (error: any) {
            console.log("ERROR IS", error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    }).post("/edit-pyq/:id", async (c) => {
        try {
            const id: string = c.req.param("id");
            const body = await c.req.parseBody();
            // console.log("===========>",body)
            await UpadtePyq(body, c, id);
            return c.json({ message: "Resources updated successfully" }, 200);
        } catch (error: any) {
            console.log("ERROR IS", error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    }).get("/", async (c) => {
        try {
            const { page, subjectId, year, offset } = c.req.query();
            const pyqs = await getPyqs(page, subjectId, year, offset);
            return c.json({ pyqs }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/data/:id", async (c) => {
        try {
            const id: string = c.req.param('id');
            const pyq = await getPyqById(id);
            console.log(pyq)
            return c.json({ pyq }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })