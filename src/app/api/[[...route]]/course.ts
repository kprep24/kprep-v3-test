import { addCourseSchema, } from "@/schema/course_branch.schema";
import { createCourse, deleteCourse, getAllCourses, getCourseById, modifyCourse } from "@/services/course.services";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { paramId } from "./admin";
import { getToken } from "@/helpers/middleware/getToken";



export const course = new Hono()
    .post("/add-course", zValidator("json", addCourseSchema), async (c) => {
        try {
            const { name, type, duration } = c.req.valid("json");
            const { userId } = getToken(c);

            await createCourse({ name, type, duration, addedById: userId });
            return c.json({ message: "Course added successfully" }, 201);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })

    .get("/get-courses", async (c) => {
        try {
            console.log("THIs IS COURSE","courses")
            const courses = await getAllCourses();
            return c.json({ courses }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/get-course/:id", zValidator("param", z.object({
        id: z.string()
    })), async (c) => {
        try {
            const { id } = c.req.valid("param");
            const course = await getCourseById(id);
            return c.json({ course }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .post("/update-course/:id", zValidator("param", paramId), zValidator("json", addCourseSchema), async (c) => {
        try {
            const { id } = c.req.valid("param");
            const { userId } = getToken(c);
            const { name, duration, type, addedById } = c.req.valid("json");
            await modifyCourse({ name, duration, type, addedById: userId, courseId: id });
            return c.json({ message: "Course updated successfully" }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/delete-course/:id", zValidator("param", paramId), async (c) => {
        try {


            const { userRole } = getToken(c);


            if (userRole !== "SuperAdmin") {
                throw new HTTPException(403, { message: "Unauthorized Access" });
            }

            const { id } = c.req.valid("param");
            await deleteCourse(id);
            return c.json({ message: "Course deleted successfully" }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })