import { getToken } from "@/helpers/middleware/getToken";
import { uploadToCloudinary } from "@/lib/cloudinaryConfig";
import { db } from "@/lib/db";
import { uploadFileToDrive } from "@/lib/uploadDriveConfig";
import { Freemium, PYQTYPE, SEM_TYPE, SubjectYear, Visibility } from "@prisma/client";
import { Context } from "hono";



export const createPyq = async (body: any, c: Context) => {
    try {
        const { title, subjectId, visibility, pqyType, freemium, courseId, year, semType } = body;
        const file = body.pyq as File;
        let solResult = "";
        const solution = body.solution as File;
        if (!file) return c.json({ error: "File is required" }, 400);
        if (solution) {
            const webViewLink = await uploadFileToDrive(solution, "Solutions");
            if (!webViewLink) throw new Error("Failed to upload file to Google Drive.");
            solResult = webViewLink;
        }

        const pyqLink = await uploadFileToDrive(solution, "Pyqs");
        if (!pyqLink) throw new Error("Failed to upload file to Google Drive.");


        // Pass the file path
        const { userId } = getToken(c);
        const titleStr = title.toString();
        const subjectIdStr = subjectId.toString();
        const pyqVisbility = visibility.toString() as Visibility;
        const pyqTypeStr = pqyType.toString() as PYQTYPE;
        const semTypeStr = semType.toString() as SEM_TYPE;
        const freemiumStr = freemium.toString() as Freemium;
        const courseIdStr = courseId.toString();
        const yearStr = year.toString() as SubjectYear;




        const response = await db.pyqs.create({
            data: {
                title: titleStr,
                courseId: courseIdStr,
                subjectId: subjectIdStr,
                addedById: userId,
                visibility: pyqVisbility,
                pyqType: pyqTypeStr,
                freemium: freemiumStr,
                pyqUrl: pyqLink || '',
                solutionUrl: solResult,
                year: yearStr,
                semType: semTypeStr,
                isGoogleDrive: true,
            }
        });
        return response;

    } catch (error: any) {
        console.log("ERROR", error.message, error)
        throw new Error(error);
    }
}

export const UpadtePyq = async (body: any, c: Context, id: string) => {
    try {
        const { title, subjectId, visibility, pqyType, freemium, courseId, year, semType } = body;
        // console.log(body)
        // const file = body.pyq as File;
        // const solution = body.pyq as File;

        let solResult = "";
        const solution = body.solution as File;

        // if (!file) return c.json({ error: "File is required" }, 400);
        if (solution) {
            const webViewLink = await uploadFileToDrive(solution, "Solutions");
            if (!webViewLink) throw new Error("Failed to upload file to Google Drive.");
            solResult = webViewLink;
        }
        //  file path
        const { userId } = getToken(c);
        const titleStr = title.toString();
        const subjectIdStr = subjectId.toString();
        const pyqVisbility = visibility.toString() as Visibility;
        const pyqTypeStr = pqyType.toString() as PYQTYPE;
        const semTypeStr = semType.toString() as SEM_TYPE;
        const freemiumStr = freemium.toString() as Freemium;
        const courseIdStr = courseId.toString();
        const yearStr = year.toString() as SubjectYear;




        const response = await db.pyqs.update({
            where: {
                id
            },
            data: {
                title: titleStr,
                courseId: courseIdStr,
                subjectId: subjectIdStr,
                addedById: userId,
                visibility: pyqVisbility,
                pyqType: pyqTypeStr,
                freemium: freemiumStr,
                // pyqUrl: cloudinaryResult?.publicId || '',
                solutionUrl: solResult,
                year: yearStr,
                semType: semTypeStr,
            }
        });
        return response;

    } catch (error: any) {
        console.log("ERROR", error.message, error)
        throw new Error(error);
    }
}


export const getPyqs = async (page: string, subjectId: string, year: string, offset: string) => {
    try {
        const pageNumber = Number(page) || 1;
        const offsetNumber = Number(offset) || 10;
        const skip = (pageNumber - 1);

        const pyqs = await db.pyqs.findMany({
            skip,
            take: offsetNumber,
            where: {
                subjectId: subjectId || undefined,
                year: year as SubjectYear || undefined
            },
            include: {
                addedBy: {
                    select: {
                        firstName: true
                    }
                },
                subject: {
                    select: {
                        shortName: true
                    }
                }
            }
        });
        const totalResources = await db.pyqs.count();
        const totalPages = Math.ceil(totalResources / offsetNumber);
        return { totalResources, totalPages, pyqs };
        // return pyqs;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getPyqById = async (id: string) => {
    try {

        const pyq = await db.pyqs.findFirst({
            where: { id: id },
            include: {
                subject: {
                    select: {
                        shortName: true
                    }
                }
            }
        });
        return pyq;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getSoltion = async (id: string) => {
    try {

        const solUrl = await db.pyqs.findFirst({
            where: { id: id },
            select: {
                solutionUrl: true
            }
        });
        return solUrl;
    } catch (error: any) {
        throw new Error(error);
    }
}