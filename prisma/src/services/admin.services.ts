import { db } from "@/lib/db"
import { Admin, Role } from "@prisma/client"



export const findAdminByEmail = async (email: string): Promise<Admin | null> => {
    return await db.admin.findUnique({
        where: {
            email
        }
    })
}

export const findAdminById = async (id: string): Promise<Admin | null> => {
    return await db.admin.findUnique({
        where: {
            id
        }
    })
}


interface IcreateAdminProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export const createAdmin = async ({ firstName, lastName, email, password, role }: IcreateAdminProps) => {
    try {
        return await db.admin.create({
            data: {
                firstName, lastName, email, password, role
            }
        })
    } catch (error) {
        throw new Error("Error");
    }
}

export const storeRefreshToken = async (token: string, userId: string) => {
    try {
        await db.refreshToken.create({
            data: {
                token,
                userId
            }
        })
    } catch (error) {
        throw new Error("Error");
    }
}

export const getRefreshToken = async (token: string) => {
    try {
        const dbToken = await db.refreshToken.findFirst({
            where: {
                token
            }
        });
        console.log("GET TOKEN::",dbToken)
        return dbToken;
    } catch (error: any) {
        console.log(error)
        console.log("ERROR IS: ", error.message)
        throw new Error("Error");
    }
}

export const updateRefreshToken = async (token: string, newToken: string) => {
    try {
        const update = await db.refreshToken.update({
            where: {
                token: token
            },
            data: {
                token: newToken
            }
        });
        const tokens = await db.refreshToken.findMany({ where: { token } })
        console.log("TOKEN LIST",tokens)
        return update;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.log(errorMessage);
        throw new Error(`Error updating refresh token: ${errorMessage}`);
    }
}


interface IeditUser {
    id: string;
    isBan: boolean;
    role: Role;
}

export const editUser = async ({ id, isBan, role }: IeditUser) => {
    try {
        return await db.admin.update({
            where: {
                id
            },
            data: {
                isBan,
                role
            }
        })
    } catch (error) {
        throw new Error("Error");
    }
}