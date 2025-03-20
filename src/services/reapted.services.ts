import { getToken } from "@/helpers/middleware/getToken";
import { db } from "@/lib/db";
import { uploadFileToDrive } from "@/lib/uploadDriveConfig";
import { PYQTYPE, SubjectYear } from "@prisma/client";
import { Context } from "hono";



export const addRepatedQuestion = async (body: any, c: Context) => {
    try {

        const { title, year, subjectId, courseId, pqyType } = body;
        // console.log(title, year, subjectId, courseId)
        const file = body.pyq as File;
        const fileBuffer = await file.arrayBuffer();
        const pdfBuffer = Buffer.from(fileBuffer);
        const webViewLink = await uploadFileToDrive(file, "RepatedQna");
        if (!webViewLink) throw new Error("Failed to upload file to Google Drive.");

        // const { userId } = getToken(c);
        const titleStr = title.toString();
        const yearStr = year.toString() as SubjectYear;
        const subjectIdStr = subjectId.toString();
        const courseIdStr = courseId.toString();
        const pqyTypeStr = pqyType.toString() as PYQTYPE;
        return await db.mostRepeatedQuestion.create({
            data: {
                title: titleStr,
                courseId: courseIdStr,
                subjectId: subjectIdStr,
                addedById: "67b61fe0c63a421c6548eec4",
                pyqUrl: webViewLink || '',
                year: yearStr,
                freemium: "Premium",
                visibility: "Public",
                // pqyType: "Mid",
                pyqType: pqyTypeStr,
            }
        })

    } catch (error: any) {
        return error.message || "Error";
    }
}


export const getRepeatedQuestions = async () => {
    try {
        const repeatedQuestions = await db.mostRepeatedQuestion.findMany({
            include: {
                subject: {
                    select: {
                        fullName: true
                    }
                }
            }
        });
        return repeatedQuestions;
    } catch (error: any) {
        return error.message || "Error";
    }
}

export const getRepeatedQuestionById = async (id: string) => {
    try {
        return await db.mostRepeatedQuestion.findUnique({
            where: { id: id },
            include: {
                subject: {
                    select: {
                        fullName: true
                    }
                }
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}