import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { verifyAdminAccessToken } from "../jwt/adminToken";
import { cookies } from "next/headers";



async function isAuthorized(c: Context, next: Next) {
    try {
        const accessToken = c.req.header("Authorization")
        if (!accessToken) {
            throw new HTTPException(403, { message: "You are an unauthorized user" })
        }
        console.log("NOW AUTH ACCESS TOKEN IS:", accessToken)
        const DecodeToken = verifyAdminAccessToken(accessToken!);

        if (DecodeToken.role === "SuperAdmin") {
            await next();
        } else {
            throw new HTTPException(403, { message: "You are an unauthorized user" })
        }
    } catch (error: any) {
        throw new HTTPException(500, {
            message: error.message || "Internal Server Error"
        })
    }
}

export default isAuthorized
