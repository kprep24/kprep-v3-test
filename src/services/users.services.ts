import { db } from "@/lib/db";



export const getAllUsers = async ({ page, limit, roll }: { page: string, limit: string, roll?: string }) => {
    try {
        if (roll && roll.length >= 5) {
            console.log("THIS IS CALLINg")
            const user = await db.user.findMany({
                where: {
                    email: {
                        contains: roll,
                    }
                },
                include: {
                    userDetails: {
                        select: {
                            year: true
                        }
                    }
                }
            });
            // console.log(rollNo)
            return { user }
        } else {
            const pageNumber = Number(page) || 1;
            const pageSize = Number(limit) || 10;
            const skip = (pageNumber - 1) * pageSize;
            const users = await db.user.findMany({
                skip,
                take: pageSize,
                include: {
                    userDetails: {
                        select: {
                            year: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                },


            });
            const totalUsers = await db.user.count();
            const totalPages = Math.ceil(totalUsers / pageSize);
            return {
                users,
                totalUsers,
                totalPages,
                currentPage: pageNumber,
            }
        }
    } catch (error) {
        throw new Error("Failed to fetch users.");
    }
}

export const chnageSubscription = async (id: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                id: id,
            }
        });
        if (user && user.isPremium === true) {
            //cancel subscription
            await db.user.update({
                where: {
                    id: id
                },
                data: {
                    isPremium: false
                }
            });
            return { message: "Subscription cancelled successfully." };
        } else {
            //start subscription
            await db.user.update({
                where: {
                    id: id
                },
                data: {
                    isPremium: true
                }
            });
            return { message: "Subscription started successfully." };
        }
    } catch (error) {
        throw new Error("Failed to update subscription.");
    }
}