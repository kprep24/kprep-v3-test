import { getToken } from "@/helpers/middleware/getToken";
import { addBranch } from "@/schema/course_branch.schema";
import { createBranch, deleteBranch, getAllBranches, getBranchByCourseId, getBranchesById, updateBranch } from "@/services/branch.services";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { paramId } from "./admin";





export const branch = new Hono()
    .post("/add-branch", zValidator("json", addBranch), async (c) => {
        try {
            const { courseId, shortName, name } = c.req.valid("json");
            const { userId } = getToken(c);
            await createBranch({ courseId, shortName, name, userId })

            return c.json({ message: "Branch added successfully" }, 201);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .post("/update-branch/:id", zValidator("json", addBranch), zValidator("param", paramId), async (c) => {
        try {
            const { courseId, shortName, name } = c.req.valid("json");
            const { id } = c.req.valid("param");
            const { userId } = getToken(c);
            await updateBranch({ courseId, shortName, name, userId, updateId: id })

            return c.json({ message: "Branch updated successfully." }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/get-branches", async (c) => {
        try {


            const branches = await getAllBranches();

            return c.json({ branches }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/get-branche/:id", zValidator("param", paramId), async (c) => {
        try {
            const { id } = c.req.valid("param")
            const branche = await getBranchesById(id);
            return c.json({ branche }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/branches/:id", zValidator("param", paramId), async (c) => {
        try {
            const { id } = c.req.valid("param")

            const branches = await getBranchByCourseId(id);
            return c.json({ branches }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/delete-branche/:id", zValidator("param", paramId), async (c) => {
        try {
            const { id } = c.req.valid("param")

            await deleteBranch(id);
            return c.json({ message: "Branch deleted successfully" }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })

