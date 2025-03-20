import { db } from "@/lib/db";
import { SubjectYear } from "@prisma/client";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

interface AuthenticatedUser {
    courseId: string;
    branchId: string;
    year: "One" | "Two" | "Three" | "Four";
    userType: boolean;
    userId: string;
}

export const getUser = async (c: Context): Promise<AuthenticatedUser> => {
    try {
        const userId = c.req.header("Authorization")?.trim(); // Ensure no extra spaces

        if (!userId) {
            console.log("Unauthenticated")
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const user = await db.user.findFirst({
            where: { id: userId },
            include: { userDetails: true },
        });

        if (!user || !user.userDetails) {
            throw new HTTPException(403, { message: "User not found or missing details" });
        }
        return {
            courseId: user.userDetails.courseId,
            branchId: user.userDetails.branchId,
            year: user.userDetails.year as SubjectYear,
            userType: user.isPremium,
            userId: userId
        };

    } catch (error: any) {
        throw new HTTPException(500, { message: error.message || "Internal Server Error" });
    }
};
