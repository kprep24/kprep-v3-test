import { getToken } from "@/helpers/middleware/getToken";
import { addSubjectSchema, subCourseIdSchema } from "@/schema/subject.schema";
import { createSubject, deleteSubject, getAllSubjects, getSubjectById, getSubjectCredentials, updateSubject } from "@/services/subject.services";
import { zValidator } from "@hono/zod-validator";
// import { SubjectSemester } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { paramId } from "./admin";
import { z } from "zod";
import { SubjectYear } from "@prisma/client";
// import { encryptPDFBuffer } from "@/lib/encryptPDF";


const courseIdvalidator = z.object({
    courseId: z.string()
});


export const subject = new Hono()
    .post("/add-subject", zValidator("json", addSubjectSchema), async (c) => {
        try {

            const { name, shortName, subjectCode, credit, courseType, year, semBranches, subjectType, scheme } = c.req.valid("json");
            const { userId } = getToken(c);

            const semesters: string[] = [];
            const branches: string[] = [];

            if (semBranches) {
                semBranches.forEach((sem) => {
                    semesters.push(sem.semester);
                    branches.push(sem.branch);
                });
            }
            await createSubject({
                name,
                shortName,
                subjectCode,
                credit,
                courseType,
                year,
                semesters, branches,
                addedById: userId,
                subjectType,
                scheme
            });

            return c.json({ message: "success" }, 201)

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/get-subjects", async (c) => {
        try {

            const { year, subDetails, page } = c.req.query();
            const subjects = await getAllSubjects({ year: year as SubjectYear, subDetails, page });
            return c.json({ subjects }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/:id", zValidator("param", paramId), async (c) => {
        try {



            const { id } = c.req.valid("param");
            const subject = await getSubjectById(id);
            return c.json({ subject }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/delete-subject/:id", zValidator("param", paramId), async (c) => {
        try {
            const { id } = c.req.valid("param");
            await deleteSubject(id);

            return c.json({ message: "Subject deleted successfully" }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .post("/update-subject/:id", zValidator("json", addSubjectSchema), zValidator("param", paramId), async (c) => {
        try {
            const { name, shortName, subjectCode, credit, courseType, year, semBranches, subjectType, scheme } = c.req.valid("json");
            const { id } = c.req.valid("param");
            const { userId } = getToken(c);
            const semesters: string[] = [];
            const branches: string[] = [];

            if (semBranches) {
                semBranches.forEach((sem) => {
                    semesters.push(sem.semester);
                    branches.push(sem.branch);
                });
            }

            await updateSubject({ name, shortName, subjectCode, credit, courseType, year, subjectType, scheme, subjectId: id, addedById: userId, semesters, branches });

            return c.json({ message: "Subject updated successfully" }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/subject/:courseId", zValidator("param", courseIdvalidator), async (c) => {
        try {
            const {
                courseId
            } = c.req.valid("param");

            const subjects = await getAllSubjects({ courseId });
            // console.log("course Id is", courseId)
            // console.log("SUBJECT under this course ID", subjects)
            return c.json({ subjects }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/:year/:courseId", zValidator("param", subCourseIdSchema), async (c) => {
        try {
            const {
                courseId,
                year
            } = c.req.valid("param");
            // console.log(courseId,
            //     year)
            const subjects = await getSubjectCredentials({ courseId, year });
            // console.log(subjects)
            return c.json({ subjects }, 200);
        } catch (err: any) {
            throw new HTTPException(400, { message: err.message });
        }
    })




