import { db } from "@/lib/db";
import { CDuration } from "@prisma/client";



interface IcreateCourse {
    name: string;
    type: "Bachelor" | "Master" | "Doctorate";
    duration: CDuration;
    addedById: string
}

interface IupdateCourse extends IcreateCourse {
    courseId: string;
}

export const createCourse = async ({ name, duration, type, addedById }: IcreateCourse) => {
    try {
        await db.course.create({ data: { name, duration, type, addedById } });
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}

export const modifyCourse = async ({ name, duration, type, addedById, courseId }: IupdateCourse) => {
    try {
        await db.course.update({
            where: { id: courseId },
            data: { name, duration, type, addedById }
        });
    } catch (error: any) {
        throw new Error(error.message || error);
    }
};


export const deleteCourse = async (courseId: string) => {
    try {
        await db.course.delete({ where: { id: courseId } });
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}

export const getCourseById = async (courseId: string) => {
    try {
        return await db.course.findUnique({
            where: { id: courseId },
            include: {
                addedBy: {
                    select: {
                        firstName: true
                    }
                }
            }
        });
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}

export const getAllCourses = async () => {
    try {
        return await db.course.findMany({
            include: {
                addedBy: {
                    select: {
                        firstName: true
                    }
                }
            }
        });
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}