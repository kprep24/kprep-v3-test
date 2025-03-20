import { getUser } from "@/helpers/middleware/getUser";
import { feebackFormSchema } from "@/schema/feedback.schema";
import { createFeedback, deleteFeedback, getFeedbacks, ToogleapprovedFeedback } from "@/services/feedback.services";
import { zValidator } from "@hono/zod-validator";
import { C_Feedback } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";




export const feedback = new Hono()
    .post("/", async (c) => {
        try {
            const body = await c.req.json(); 
            const { category, text } = body.data;
            let refinecategory: C_Feedback = "Feedback";
            if (category === "Report a Bug") {
                refinecategory = "Bug"
            } else if (category === "Request for New Feature") {
                refinecategory = "Feature";
            } else {
                refinecategory = "Feedback";
            }
            const { userId } = await getUser(c);
            await createFeedback(text, refinecategory, userId);
            return c.json({ message: "Feedback added successfully" }, 201);
        } catch (error: any) {
            console.log(error)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/", async (c) => {
        try {
            const { offset, category, status } = c.req.query();
            const feedbacks = await getFeedbacks(offset, category, status);
            // console.log(feedbacks)
            return c.json({ feedbacks }, 200)
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }

    })
    .put("/approved/:id", async (c) => {
        try {
            const id = c.req.param("id");
            await ToogleapprovedFeedback(id!);
            return c.json({ message: "Status changed" }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .delete("/:id", async (c) => {
        try {
            const id = c.req.param("id");
            await deleteFeedback(id!);
            return c.json({ message: "Successfully Deleted" }, 200);

        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .patch("/:id", async (c) => {
        return c.json({ message: "Delete API is working" }, 200);
    })