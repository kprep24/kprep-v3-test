import { db } from "@/lib/db";
import { C_Feedback } from "@prisma/client";


export const getFeedbacks = async (offset: string, category: string, status: string) => {
    try {
        const feedback = await db.feedback.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
        return feedback;
    } catch (error: any) {
        throw new Error(error);
    }
}


export const ToogleapprovedFeedback = async (id: string) => {
    try {
        const feedback = await db.feedback.findUnique({
            where: {
                id: id
            }
        });
        if (!feedback) {
            throw new Error("Feedback not found");
        }
        const status = feedback.approved;
        await db.feedback.update({
            where: {
                id: id
            },
            data: {
                approved: !status
            }
        });

    } catch (error: any) {
        throw new Error(error);
    }
}

export const deleteFeedback = async (id: string) => {
    try {
        await db.feedback.delete({
            where: {
                id: id
            }
        });
    } catch (error: any) {
        throw new Error(error);
    }
}


export const createFeedback = async (text: string, category: C_Feedback, userId: string) => {
    try {
        return await db.feedback.create({
            data: {
                review: text,
                category,
                userId,
                approved: false
            }
        });
    } catch (error: any) {
        throw new Error(error);
    }
}