import { db } from "@/lib/db";
import { InviteAdmin, Role } from "@prisma/client";


interface IcreateInviteAdmin {
    firstName: string;
    role: Role;
    email: string;
    userId: string;
    token: string;
    duration: Date
}



export const createInviteAdmin = async (payload: IcreateInviteAdmin) => {

    const { firstName, email, role, userId, token, duration } = payload;

    try {
        const invitation = await db.inviteAdmin.create({
            data: {
                firstName,
                email,
                role,
                activeToken: token,
                activeTokenExpiry: new Date(duration),
                addedById: userId
            }
        });
        return invitation;
    } catch (error) {
        console.log(error)
        throw new Error("Error occur")
    }

}


export const findInviteAdminByEmail = async (email: string): Promise<InviteAdmin | null> => {
    try {
        return await db.inviteAdmin.findUnique({
            where: {
                email
            }
        })
    } catch (error) {
        throw new Error("Error occur")
    }
}

export const deleteInvitation = async (email: string) => {
    try {
        return await db.inviteAdmin.delete({
            where: {
                email
            }
        })
    } catch (error) {
        throw new Error("Error occur")

    }
}

export const invitationAdmins = async () => {
    try {
        return await db.inviteAdmin.findMany({
            include: {
                addedBy: {
                    select: {
                        firstName: true
                    }
                }
            }
        });
    } catch (error) {
        throw new Error("Error occur")
    }
}


export const deleteInviteAdmin = async (id: string) => {
    try {
        return await db.inviteAdmin.delete({
            where: {
                id
            }
        })
    } catch (error) {
        throw new Error("Error occur")
    }
}