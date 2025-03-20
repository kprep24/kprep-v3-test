import { Context } from "hono";
import { verifyAdminAccessToken } from "../jwt/adminToken";

interface AuthenticatedUser {
  userId: string;
  userRole: string;
}

export const getToken = (c: Context): AuthenticatedUser => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  try {
    const { id: userId, role: userRole } = verifyAdminAccessToken(authHeader);
    
    if (!userId || !userRole) {
      throw new Error("Invalid token payload");
    }

    return { userId, userRole };
  } catch (error) {
    throw new Error(`Token verification failed: ${(error as Error).message}`);
  }
};
