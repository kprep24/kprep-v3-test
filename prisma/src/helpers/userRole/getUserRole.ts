import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { verifyAdminAccessToken } from "../jwt/adminToken";




export default function getUserToken(c: Context) {


    const accessToken = getCookie(c, "accessToken");
    const { role: userRole, id } = verifyAdminAccessToken(accessToken!);

    return { userRole, id };

}
