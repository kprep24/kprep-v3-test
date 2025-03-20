import { db } from "@/lib/db";



interface IcreateBranch {
    courseId: string;
    name: string;
    shortName: string;
    userId: string;
}

interface IupdateBranch extends IcreateBranch {
    updateId: string;
}
export const createBranch = ({ name, shortName, courseId, userId }: IcreateBranch) => {
    try {

        return db.branch.create({
            data: {
                name,
                shortName,
                courseId,
                addedById: userId
            }
        })

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteBranch = (id: string) => {
    try {
        return db.branch.delete({ where: { id } })
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getBranchesById = (branchId: string) => {
    try {
        return db.branch.findFirst({
            where: { id: branchId },
        })
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getAllBranches = () => {
    try {
        return db.branch.findMany({
            include: {

                addedBy: {
                    select: {
                        firstName: true
                    }
                },
                Course: {
                    select: {
                        name: true
                    }
                }
            }
        })
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateBranch = async ({ name, shortName, courseId, userId, updateId }: IupdateBranch) => {
    try {
        return await db.branch.update({
            where: { id: updateId },
            data: {
                name,
                shortName,
                courseId,
                addedById: userId
            }
        })
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getBranchByCourseId = async (id: string) => {
    try {
        return await db.branch.findMany({
            where: {
                courseId: id
            }
        })
    } catch (error: any) {
        throw new Error(error.message);
    }
}