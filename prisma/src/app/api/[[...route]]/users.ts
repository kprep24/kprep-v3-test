import { chnageSubscription, getAllUsers } from "@/services/users.services";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { paramId } from "./admin";
import { HTTPException } from "hono/http-exception";
import { getToken } from "@/helpers/middleware/getToken";



export const users = new Hono()
    .get("/", async (c) => {
        try {
            const { page, limit, roll } = c.req.query();
            const { users, totalUsers,
                totalPages, currentPage, user } = await getAllUsers({ page, limit, roll });

            return c.json({
                users, totalUsers,
                totalPages, currentPage, user
            }, 200);
        } catch (error: any) {
            throw new HTTPException(error.message);
        }
    })
    .get("/make-premium/:id", zValidator("param", paramId), async (c) => {
        try {
            const { userRole } = getToken(c);


            if (userRole !== "SuperAdmin") {
                throw new HTTPException(403, { message: "Unauthorized Access" });
            }

            const { id } = c.req.valid("param");
            const users = await chnageSubscription(id);
            return c.json({ message: users.message }, 200);
        } catch (error: any) {
            throw new HTTPException(error.message);
        }
    })