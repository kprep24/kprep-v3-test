import jwt from "jsonwebtoken";

type IAccessToken = {
    id: string;
    role: string;
}

interface IAccessPayload extends jwt.JwtPayload {
    id: string;
    role: string;
}

interface IRefreshToken {
    id: string;
}

interface IRefreshPayload extends jwt.JwtPayload {
    id: string;
}


const { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, ADMIN_ACCESS_TOKEN_SECRET, ADMIN_REFRESH_TOKEN_SECRET } = process.env;

export const createAdminAccessToken = (payload: IAccessToken) => {
    const { id, role } = payload;
    try {
        return jwt.sign({ id, role }, ADMIN_ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
    } catch (error) {
        throw new Error("Error while creating token");
    }
}

export const createAdminRefreshToken = (payload: IRefreshToken) => {
    const { id } = payload;
    try {
        return jwt.sign({ id }, ADMIN_REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
    } catch (error) {
        throw new Error("Error while creating token");
    }
}

export const verifyAdminAccessToken = (token: string): IAccessPayload => {
    try {

        return jwt.verify(token, ADMIN_ACCESS_TOKEN_SECRET!) as IAccessPayload;
    } catch (error) {
        console.log(error)
        throw new Error("Error while verifying token");
    }
}


export const verifyAdminRefreshToken = (token: string): IRefreshPayload => {
    try {
        return jwt.verify(token, ADMIN_REFRESH_TOKEN_SECRET!) as IRefreshPayload;
    } catch (error) {
        console.log(error);
        throw new Error("Error while verifying token");
    }
}
