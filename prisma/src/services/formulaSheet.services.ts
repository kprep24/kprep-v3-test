import { getToken } from "@/helpers/middleware/getToken";
import { db } from "@/lib/db";
import { uploadFileToDrive } from "@/lib/uploadDriveConfig";
import { F_TYPE, SubjectYear } from "@prisma/client";
import { Context } from "hono";


export interface IGetSheet {
    page?: string,
    offset?: string,
    subjectId?: string,
    type?: F_TYPE,
}



export const createFormulaSheet = async (body: any, c: Context) => {
    try {
        const { title, subjectId, type } = body;
        // console.log(title, subjectId, type)
        const file = body.file as File;
        console.log(file)
        if (!file) return c.json({ error: "File is required" }, 400);
        // Upload file to Google Drive
        const webViewLink = await uploadFileToDrive(file, "Formula");
        console.log("===========>", webViewLink)
        if (!webViewLink) throw new Error("Failed to upload file to Google Drive.");
        const subjectIdStr = subjectId.toString();
        const { userId } = getToken(c);
        const typeStr = type as F_TYPE;
        console.log(title)
        return await db.formula.create({
            data: {
                title: "text1",
                userId: "67b628a9fcc791ae84a87346",
                subjectId: "67b436c0bc98bd22f2836e3d",
                fileUri: webViewLink,
                type: typeStr,
                
            }
        })
    } catch (error: any) {
        console.log("ERROR", error.message, error)
        throw new Error(error);
    }
}

export const getFormulaSheets = async ({ page, offset, subjectId, type }: IGetSheet) => {
    try {
        const pageNumber = Number(page) || 1;
        const offsetNumber = Number(offset) || 10;
        const skip = (pageNumber - 1) * offsetNumber;
        const formulaSheets = await db.formula.findMany({
            where: {
                subjectId: subjectId || undefined,
                type: type || undefined,
            },
            skip,
            take: offsetNumber,
            include: {
                subject: {
                    select: {
                        fullName: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const totalCount: number = await db.formula.count();
        const totalsPages = Math.ceil(totalCount / offsetNumber);
        return { formulaSheets, totalsPages };
    } catch (error: any) {
        console.log("ERROR", error.message, error)
        throw new Error(error);
    }
}


export const getFormulaSheetByYear = async (year: SubjectYear, subjectId?: string) => {
    try {
        const formulaSheets = await db.subject.findMany({
            where: {
                year: year
            },
            select: {
                Formula: {
                    select: {
                        title: true,
                        // fileUri: true,
                        // type: true,
                        subjectId: true,
                        id: true,
                        subject: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            }
        });
        return formulaSheets;
    } catch (error: any) {
        console.log("ERROR", error.message, error)
        throw new Error(error);
    }
}

export const getPDF = async (pdfId: string) => {
    try {
        const formulaSheet = await db.formula.findUnique({
            where: {
                id: pdfId
            }
        });
        if (!formulaSheet) throw new Error("Formula sheet not found");
        return formulaSheet.fileUri;
    } catch (error: any) {
        console.log("ERROR", error.message, error)
        throw new Error(error);
    }
}