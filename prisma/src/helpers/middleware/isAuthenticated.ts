import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";



async function isAuthenticated(c: Context, next: Next) {
    try {
        const accessToken = c.req.header("Authorization")
        if (!accessToken) {
            throw new HTTPException(401, { message: "Unauthorized" })
        }
        await next()

    } catch (error: any) {
        throw new HTTPException(500, {
            message: error.message || "Internal Server Error"
        })
    }
}

export default isAuthenticated
