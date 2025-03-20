import { db } from "@/lib/db"
import { SubjectYear } from "@prisma/client";
import { Context } from "hono";


export const getPyqById = async (resId: string) => {
    try {
        const pyq = await db.pyqs.findUnique({
            where: {
                id: resId
            },
            select: {
                pyqUrl: true,
                freemium: true,
            }
        });
        return pyq?.pyqUrl;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getPyqs = async (year: SubjectYear) => {
    try {
        const pyqs = await db.pyqs.findMany({
            where: {
                year: year
            },
            select: {
                id: true,
                title: true,
                freemium: true,
                subjectId: true,
                pyqType: true,
                solutionUrl:true,
                subject: {
                    select: {
                        fullName: true
                    }
                }
            }
        });
        return pyqs;
    } catch (error: any) {
        throw new Error(error);
    }
}


export const getPdfById = async (id: string) => {
    try {
        const pdf = await db.resources.findUnique({
            where: {
                id: id
            },
            select: {
                fileUrl: true,
                freemium: true,
            }
        })
        return pdf?.fileUrl;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getResourcesByYear = async (year: SubjectYear) => {
    try {
        return await db.resources.findMany({
            where: {
                ResourcesDetails: { year: year }
            },
            select: {
                id: true,
                title: true,
                description: true,
                freemium: true,
                subjectId: true,
                contentType: true,
                subject: {
                    select: {
                        fullName: true
                    }
                }
            }
        })
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getSubjectsByYear = async (year: SubjectYear) => {
    try {
        let subjects;
        if (year === "One") {
            subjects = await db.subject.findMany({
                where: {
                    year: "One",
                }
            });
        } else {
            subjects = await db.subject.findMany({
                where: {
                    year: year,
                }
            })
        }
        return subjects;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getUserDetailsById = async (id: string) => {
    try {
        return await db.user.findFirst({
            where: { id },
            include: {
                userDetails: {
                    include: {
                        Branch: {
                            select: {
                                shortName: true,
                            }
                        },
                    }
                }
            }
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export const complteOnBoarding = async (branchId: string, semester: string, year: SubjectYear, id: string) => {
    try {
        return await db.userDetails.upsert({
            where: { userId: id },
            create: {
                branchId,
                semester,
                year,
                userId: id,
                isVerified: true,
                courseId: "679e5867950fff523f5cefcb",
                isLocked: true,
                modifyCount: 1,
            },
            update: {
                branchId,
                semester,
                year,
                isVerified: true,
                courseId: "679e5867950fff523f5cefcb",
                isLocked: true,
                modifyCount: {
                    increment: 1,
                },
            }
        });
    } catch (error: any) {
        throw new Error(error);
    }
}


export const getBranches = async (c: Context) => {
    try {
        const courseId = c.req.query("courseId") || "67b037b1a52d674fe01afab0"; // Default course ID

        const branches = await db.branch.findMany({
            where: { courseId }
        });
        return branches;
    } catch (error: any) {
        throw new Error(error);
    }
}
