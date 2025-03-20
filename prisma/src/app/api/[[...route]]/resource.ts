import { db } from "@/lib/db";
import { createResources, getResources, getResourcesById, ResourcesToogleStatus } from "@/services/resources.services";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";


export const resources = new Hono()
    .post("/add-resource", async (c) => {
        try {
            const body = await c.req.parseBody();
            await createResources(body, c);
            return c.json({ message: "Resources added successfully" }, 201);
        } catch (error: any) {
            console.log("ERROR IS", error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/", async (c) => {
        try {
            const { page, subjectId, year, offset } = c.req.query();
            const resources = await getResources({ page, subjectId, year, offset });
            console.log(resources)
            return c.json({ resources }, 201);
        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/view/:id", async (c) => {
        try {
            const id = c.req.param('id');
            const resource = await getResourcesById(id);
            return c.json({ pdf: resource.fileUrl, resource }, 200);
        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .post("/modifyAll/:id", async (c) => {
        try {

            const id = c.req.param("id");
            const res = await db.resources.updateMany({
                where: {
                    ResourcesDetails: { courseId: "67b037b1a52d674fe01afab0" }
                },
                data: {
                    addedById: id
                }
            })
            return c.json({ message: "Hello" })
        } catch (error) {
            return c.json({ error: "Invalid request" }, 400);
        }
    })
    .post("/upAll", async (c) => {
        try {
            console.log("object created")
            await db.resources.updateMany({
                where: {
                    freemium: "Free"
                },
                data: {
                    freemium: "Premium"
                }
            });
            return c.json({ message: "Updated successfully" });
        } catch (error) {
            console.error("Error updating resources:", error);
            return c.json({ error: "Invalid request" }, 400);
        }
    })
    .get("/freePremium", async (c) => {
        try {
            const { id } = c.req.query();

            const result = await ResourcesToogleStatus(id, c);
            if ('newStatus' in result) {
                return c.json({ message: `Updated to ${result.newStatus}` }, 200);
            } else {
                return c.json({ message: "Error" }, 404);
            }
        } catch (error) {
            console.error("Error updating resources:", error);
            return c.json({ error: "Invalid request" }, 400);
        }
    })


