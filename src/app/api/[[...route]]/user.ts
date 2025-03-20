import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { paramId } from "./admin";
import { userSchema } from "@/schema/user.schema";
import { getUser } from "@/helpers/middleware/getUser";
import { feebackFormSchema } from "@/schema/feedback.schema";
import { createFeedback } from "@/services/feedback.services";
import { C_Feedback } from "@prisma/client";
import { getPyqById, getSoltion } from "@/services/pyq.services";
import { complteOnBoarding, getBranches, getPdfById, getPyqs, getResourcesByYear, getSubjectsByYear, getUserDetailsById } from "@/services/user.services";
import { db } from "@/lib/db";





export const user = new Hono()
    .get("/bio/:id", zValidator("param", paramId), async (c) => {
        try {
            const { id } = c.req.valid("param");

            const user = await getUserDetailsById(id);
            console.log("THIS IS USER", user)

            return c.json({ user }, 200);


        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })

    // Get branches by course ID (dynamic)
    .get("/branch", async (c) => {
        try {


            const branches = await getBranches(c);

            if (!branches.length) {
                throw new HTTPException(404, { message: "No branches found" });
            }

            return c.json({ branches }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .post("/set-up/:id", zValidator("param", paramId), zValidator("json", userSchema), async (c) => {


        try {
            const { branchId, semester, year } = c.req.valid("json");
            const { id } = c.req.valid("param");
            await complteOnBoarding(branchId, semester, year, id);
            return c.json({ message: "Done" }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }

    }).get("/subjects", async (c) => {
        try {
            const { year } = await getUser(c);
            let subjects = await getSubjectsByYear(year);
            return c.json({ subjects }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/resources", async (c) => {
        try {

            const { year } = await getUser(c);


            const resource = await getResourcesByYear(year);
            return c.json({ resource }, 200);

        } catch (error: any) {
            console.log("=========>", error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/get-pdf/:id", async (c) => {
        try {
            const resId = c.req.param("id");
            const pdfUrl = await getPdfById(resId);
            return c.json({ url: pdfUrl }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/pyqs", async (c) => {
        try {
            const { year } = await getUser(c);
            let pyqs = await getPyqs(year);
            return c.json({ pyqs }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/get-pyq/:id", async (c) => {
        try {
            const { userType } = await getUser(c);
            if (userType) {
                const resId = c.req.param("id");
                const pdfUrl = await getPyqById(resId);
                return c.json({ url: pdfUrl }, 200);
            } else {
                throw new HTTPException(403, { message: "Access Denied" });
            }
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/view-sol/:id", async (c) => {
        try {
            const { userType } = await getUser(c);
            if (userType) {
                const resId = c.req.param("id");
                const solURL = await getSoltion(resId);
                return c.json({ url: solURL }, 200);
            } else {
                throw new HTTPException(403, { message: "Access Denied" });
            }
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/repeated-qns", async (c) => {
        try {
            const { year } = await getUser(c);
            const repeatedQns = await db.mostRepeatedQuestion.findMany({
                where: {
                    year: year,
                }
            });
            console.log(repeatedQns)
            return c.json({ repeatedQns }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get("/repeated-qns/:id", async (c) => {
        try {
            const { id } = c.req.param();
            const { userType } = await getUser(c);
            // if (userType) {
                const repeatedQns = await db.mostRepeatedQuestion.findFirst(
                    { where: { id }, select: { pyqUrl: true } },

                )
            // }
            // console.log(repeatedQns)/
            return c.json({ url: repeatedQns }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .post("/add-feedback", zValidator("json", feebackFormSchema), async (c) => {
        try {
            const { text, category } = c.req.valid("json");
            const { userId } = await getUser(c);


            let categoryTypes: C_Feedback = "Feedback";
            if (category === "Request for New Feature") {
                categoryTypes = "Feature";
            } else if (category === "Report a Bug") {
                categoryTypes = "Bug"
            }
            else {
                categoryTypes = "Feedback"
            }
            await createFeedback(text, categoryTypes, userId);
            return c.json({ message: "Feedback submitted successfully" }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })