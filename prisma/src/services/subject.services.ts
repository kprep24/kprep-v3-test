import { db } from "@/lib/db";
import { SubjectYear } from "@prisma/client";
// import { SubjectSemester } from "@prisma/client";



interface IcreateSubject {
    name: string;
    shortName: string;
    subjectCode: string;
    credit: "One" | "Two" | "Three" | "Four";
    courseType: string;
    year: "One" | "Two" | "Three" | "Four";
    semesters: string[];
    branches: string[];
    addedById: string;
    scheme: "SchemeA" | "SchemeB"
    subjectType: "Core" | "Elective" | "Lab"; // enum("Theory", "Practical") | "Lab"; // enum("Theory", "Practical", "Lab")
}


interface IUpdateSubject extends IcreateSubject {
    subjectId: string;
}


export const updateSubject = async ({ subjectId, name, shortName, subjectCode, credit, courseType, year, branches, semesters, addedById, subjectType, scheme }: IUpdateSubject) => {
    try {

        await db.subject.update({
            where: {
                id: subjectId
            },
            data: {
                fullName: name,
                shortName,
                code: subjectCode,
                credit,
                year,
                addedById,
                subjectType
            }
        });
        if (year === "One") {
            await db.subjectDetails.update({
                where: {
                    subjectId,
                    courseId: courseType,
                },
                data: {
                    scheme
                }
            })
        } else {
            await db.subjectDetails.update({
                where: {
                    subjectId: subjectId
                },
                data: {
                    courseId: courseType,
                    semester: semesters,
                    branchId: branches
                }
            })
        }
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}

export const createSubject = async ({
    name,
    shortName,
    subjectCode,
    credit,
    courseType,
    year,
    branches, semesters, addedById, subjectType, scheme
}: IcreateSubject) => {
    try {

        // console.log("SEMES:;", semesterEnums);
        const addSubject = await db.subject.create({
            data: {
                fullName: name,
                shortName,
                code: subjectCode,
                credit,
                year,
                addedById,
                subjectType
            }
        });
        if (year === "One") {
            await db.subjectDetails.create({
                data: {
                    subjectId: addSubject.id,
                    courseId: courseType,
                    scheme: scheme
                }
            })
        } else {
            await db.subjectDetails.create({
                data: {
                    subjectId: addSubject.id,
                    courseId: courseType,
                    semester: semesters,
                    branchId: branches
                }
            })
        }
        return addSubject;
    } catch (error: any) {
        throw new Error(error.message || "Error creating")
    }
}

export const deleteSubject = async (subjectId: string) => {
    try {
        await db.subject.delete({ where: { id: subjectId } });
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}

export const getSubjectById = async (subjectId: string) => {
    try {
        // console.log("THIS IS SUBJECTID",subjectId)
        return await db.subject.findUnique({
            where: { id: subjectId },
            include: {
                subjectDetails: true
            }
        });
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}




export const getAllSubjects = async ({ courseId, year, subDetails, page }: { courseId?: string, year?: SubjectYear, subDetails?: string, page?: string }) => {
    try {
        if (courseId) {
            return await db.subject.findMany({
                where: {
                    subjectDetails: {
                        courseId: courseId
                    }
                }
            });
        } else if (page || year || subDetails) {
            console.log("YAER IS", year)
            const pageNumber = Number(page) || 1;
            const windowSize = 10;
            const skip = (pageNumber - 1) * windowSize;
            const subjects = await db.subject.findMany({
                where: {
                    year: year || undefined,
                    code: subDetails || undefined
                },
                skip,
                take: windowSize,

                include: {
                    _count: {
                        select: {
                            Resources: true,
                            Pyqs: true
                        }
                    }
                }
            });
            const totalSubjects: number = await db.subject.count();
            const totalPages = Math.ceil(totalSubjects / windowSize);
            return { subjects, totalPages, totalSubjects };
        }
        else if (subDetails) {
            return await db.subject.findMany({
                where: {
                    OR: [{ code: subDetails }, { fullName: subDetails }]
                }
            });
        }
        else if (year && subDetails) {
            return await db.subject.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                { code: subDetails },
                                { fullName: subDetails }
                            ]
                        },
                        { year: year }
                    ]
                }
            });
        }
        else {
            return db.subject.findMany({
                include: {
                    _count: {
                        select: {
                            Resources: true,
                            Pyqs: true
                        }
                    }
                }
            });
        }

    } catch (error: any) {
        throw new Error(error.message || error);

    }

}

export interface IgetSubjectCredentials {
    courseId: string;
    year: "One" | "Two" | "Three" | "Four";
}

export const getSubjectCredentials = async ({ courseId, year }: IgetSubjectCredentials) => {
    try {

        return await db.subject.findMany({
            where: {
                year: year,
                subjectDetails: {
                    courseId,
                }
            }
        })

    } catch (error: any) {
        throw new Error(error.message || error);

    }
}