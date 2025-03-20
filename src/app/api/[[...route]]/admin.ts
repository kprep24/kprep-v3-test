import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception';
import { zValidator } from "@hono/zod-validator"
import { loginSchema, invitationSchema, setupAccountSchema, editAdminSchema } from "@/schema/auth.schema";
import { createAdmin, editUser, findAdminByEmail, findAdminById, getRefreshToken, storeRefreshToken, updateRefreshToken } from "@/services/admin.services";
import { createAdminAccessToken, createAdminRefreshToken, verifyAdminRefreshToken } from "@/helpers/jwt/adminToken";
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import { comparePassword, hashPassword } from "@/helpers/hash/password";
import axios from "axios";
import { createInviteAdmin, deleteInvitation, deleteInviteAdmin, findInviteAdminByEmail, invitationAdmins } from "@/services/invitation.services";
import { createInvitationToken, verifyInvitationToken } from "@/helpers/jwt/invitationToken";
import { z } from "zod";
import { db } from "@/lib/db";
import isAuthorized from "@/helpers/middleware/isAuthorized";





export const paramId = z.object({
    id: z.string()
})



export const admin = new Hono()
    .post("/sign-in", zValidator("json", loginSchema), async (c) => {
        try {
            const { email, password } = c.req.valid("json");
            console.log(email, password);
            //find user by email
            const user = await findAdminByEmail(email);
            //check if user not exists
            if (!user) {
                throw new HTTPException(404, { message: "Your email is not exists in our record" })
            }

            //check if user blocked
            if (user.isBan) {
                throw new HTTPException(403, { message: "Your account is suspended" })
            }

            //check if user exists
            const hashPWd = await comparePassword(password, user.password);

            //check if password not match
            if (!hashPWd) {
                throw new HTTPException(401, { message: "Invalid password" })
            }

            //create access token and refresh token
            const accessToken = createAdminAccessToken({ id: user.id, role: user.role });
            const refreshToken = createAdminRefreshToken({ id: user.id });


            // Store refresh token in DB
            // storeRefreshToken(refreshToken, user.id);


            //set refresh token in cookie
            setCookie(c, "refreshToken", refreshToken, {
                // httpOnly: true,
                sameSite: "Strict",
                // secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            });

            //set access token in cookie
            setCookie(c, "accessToken", accessToken, {
                // httpOnly: true,
                sameSite: "Strict",
                // secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 15)
            });

            //return user data and access token
            return c.json({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                email: user.email,
                joiningDate: user.createdAt,
                accessToken
            }, 200);

        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .post("/refresh-token", async (c) => {
        try {
            //get refresh token from cookie
            const refreshToken = getCookie(c, "refreshToken");
            // console.log(refreshToken)
            //check refresh token not exists
            if (!refreshToken) {
                throw new HTTPException(401, { message: "Unauthorized" })
            }
            //verfiy token
            const refreshTokenPayload = verifyAdminRefreshToken(refreshToken);
            //extract user id from token
            const { id } = refreshTokenPayload;
            // Check if refresh token is valid in DB
            // const storedToken = getRefreshToken(refreshToken);
            // if (!storedToken) {
            //     throw new HTTPException(403, { message: "Invalid refresh token" })
            // }
            //find user by id
            const user = await findAdminById(id);
            //if user not exists
            if (!user) {
                throw new HTTPException(404, { message: "User not found" })
            }
            //generate new access token
            const accessToken = createAdminAccessToken({ id: user.id, role: user.role });
            //create access token and refresh token
            const newRefreshToken = createAdminRefreshToken({ id: user.id });

            //update refresh token
            // updateRefreshToken(refreshToken, newRefreshToken);
            setCookie(c, "accessToken", accessToken, {
                // httpOnly: true,
                sameSite: "Strict",
                // secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 15)
            });
            setCookie(c, "refreshToken", newRefreshToken, {
                // httpOnly: true,
                sameSite: "Strict",
                // secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            });
            console.log("THIS IS IS")
            //return new access token
            return c.json({ accessToken }, 200);

        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })

        }
    })
    .get("/protected/admins", async (c) => {
        try {
            // console.log("object")
            const admins = await db.admin.findMany();
            return c.json({ admins }, 200);
        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/protected/invitations", async (c) => {
        try {

            const invitations = await invitationAdmins();
            return c.json({ invitations }, 200);

        } catch (error: any) {

            throw new HTTPException(500, {
                message: error.message || "Internal Server Error"
            })

        }
    })
    .get("/protected/sign-out", async (c) => {
        try {
            console.log("THIS is tiggered")
            //delete the cookie
            deleteCookie(c, "refreshToken");
            deleteCookie(c, "accessToken");
            return c.json({ message: "Sign out successfully" }, 200);

        } catch (error) {
            throw new HTTPException(500, { message: "Internal Server Error" })
        }
    })
    .post("/protected/change-password", async (c) => {
        try {
            console.log(c);
            //  const { oldPassword, newPassword } = c.req.valid("json");
            //  const user = c.context.user;
            return c.json({ message: "Hello" })
        } catch (error) {

        }
    })
    .post("/protected/add-admin", isAuthorized, zValidator("json", invitationSchema.extend({
        userId: z.string()
    })), async (c) => {
        try {
            const { email, firstName, role, userId } = c.req.valid("json");

          
            //only super admin can invite a user

            //create a token
            const token = createInvitationToken({ email });
            const duration = new Date(Date.now() + 60 * 15 * 1000);
            //check email exists or not
            const isExits = await findInviteAdminByEmail(email);
            const isExitsInAdmin = await findAdminByEmail(email);
            if (isExits || isExitsInAdmin) {
                throw new HTTPException(409, {
                    message: "User already exists"
                });
            }
            //create a new user 
            await createInviteAdmin({
                firstName, email, role, userId: userId, token, duration
            });


            //generate url
            const TESTURL = process.env.APP_URL_TEST;
            const PRODURL = process.env.APP_URL_PRODUCTION;
            let activeURl;
            if (process.env.NODE_ENV === "production") {
                activeURl = PRODURL;
            } else {
                activeURl = TESTURL;
            }

            const activationURL = `${activeURl}/set-up-account?token=${token}`;

            //send email to user with token
            const URL_TEST = `${TESTURL}/api/email`;
            const URL_PROD = `${PRODURL}/api/email`;
            let URL;
            if (process.env.NODE_ENV === "production") {
                URL = URL_PROD;
            } else {
                URL = URL_TEST;
            }
            const res = await axios.post(URL, {
                firstName, role, url: activationURL, email
            });
            if (!res.data.id) {
                throw new HTTPException(500, {
                    message: "Failed to send email"
                })
            }
            return c.json({ success: true, message: "Check your email" }, 201);


        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, {
                message: error.message || "Internal Server Error"
            })
        }
    })
    .get("/protected/delete-admin/:id", isAuthorized, zValidator("param", paramId), async (c) => {

        try {
            const { id } = c.req.valid("param");
            console.log(id)
            await deleteInviteAdmin(id);

            return c.json({
                success: true, message: "Admin deleted successfully"
            }, 200)
        } catch (error: any) {
            console.log(error)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }

    })
    .post("/set-up-user/:token", zValidator("json", setupAccountSchema), zValidator("param", z.object({
        token: z.string()
    })), async (c) => {
        try {
            console.log("object")
            const { token } = c.req.valid("param");
            const { firstName, lastName, password } = c.req.valid("json");
            //extract email from token
            const { email } = verifyInvitationToken(token);

            //find user using email
            const userInfo = await findInviteAdminByEmail(email);
            if (!userInfo) {
                throw new HTTPException(401, { message: "Invalid email address" });
            }
            const time = new Date(Date.now());
            //if token is valid and not expired
            if (userInfo.activeTokenExpiry && userInfo.activeTokenExpiry <= time) {
                throw new HTTPException(401, { message: "Token expired" });
            }
            //hash password
            const hashPwd = await hashPassword(password);
            //create new admin
            await createAdmin({ firstName, lastName, email, password: hashPwd, role: userInfo.role });
            //delete invitation
            await deleteInvitation(email);
            return c.json({ success: true, message: "Account setup successfully" }, 201);
        } catch (error: any) {
            throw new HTTPException(500, {
                message: error.message || "Internal Server Error"
            })
        }
    })
    .post("/protected/edit-user/:id", isAuthorized, zValidator("json", editAdminSchema), zValidator("param", paramId), async (c) => {
        try {

            // 1) user is authenticated
            // 2) user should be a super admin
            // both conditions are checked by middleware


            const { id } = c.req.valid("param");
            const { isBan, role } = c.req.valid("json");
            await editUser({ id, isBan, role });
            return c.json({ success: true, message: "User updated successfully" }, 200);


        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })
    .get('/protected/:id', zValidator("param", paramId), async (c) => {
        try {
            const { id } = c.req.valid("param");
            const user = await findAdminById(id);
            if (!user) {
                throw new HTTPException(404, { message: "User not found" });
            }
            return c.json({ user }, 200);
        } catch (error: any) {
            throw new HTTPException(500, { message: error.message || "Internal Server Error" });
        }
    })



