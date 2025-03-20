import { getToken } from "@/helpers/middleware/getToken";
import { uploadToCloudinary } from "@/lib/cloudinaryConfig";
import { db } from "@/lib/db";
import { createPDFBufferFromFile } from "@/lib/encryptPDF";
import { uploadFileToDrive } from "@/lib/uploadDriveConfig";

import { ContentType, Freemium, SubjectYear, Visibility } from "@prisma/client";
import { Context } from "hono";




export const createResources = async (body: any, c: Context) => {
    try {
        const { title, description, subjectId, noteVisibility, noteType, freemium, courseId, year } = body;
        const file = body.file as File;

        if (!file) return c.json({ error: "File is required" }, 400);

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Upload file to Google Drive
        const webViewLink = await uploadFileToDrive(file, "Resources");
        if (!webViewLink) throw new Error("Failed to upload file to Google Drive.");

        const { userId } = getToken(c);
        const titleStr = title.toString();
        const descriptionStr = description.toString();
        const subjectIdStr = subjectId.toString();
        const noteVisibilityStr = noteVisibility.toString() as Visibility;
        const noteTypeStr = noteType.toString() as ContentType;
        const freemiumStr = freemium.toString() as Freemium;
        const courseIdStr = courseId.toString();
        const yearStr = year.toString() as SubjectYear;

        // Save to database
        const response = await db.resources.create({
            data: {
                addedById: userId,
                title: titleStr,
                description: descriptionStr,
                subjectId: subjectIdStr,
                visibility: noteVisibilityStr,
                contentType: noteTypeStr,
                fileName: file.name,
                fileUrl: webViewLink,
                freemium: "Premium",
                isGoogleDrive: true
            }
        });

        await db.resourcesDetails.create({
            data: {
                resourcesId: response.id,
                year: yearStr,
                courseId: courseIdStr
            }
        });

        return c.json({ message: "Resource created successfully", fileUrl: webViewLink });


    } catch (error: any) {
        console.log("ERROR", error.message, error)
        throw new Error(error);
    }
}


export const getResources = async ({ page, subjectId, year, offset }: {
    page: string, subjectId?: string, year?: string, offset: string
}) => {
    try {

        const pageNumber = Number(page) || 1;
        const offsetNumber = Number(offset) || 10;
        const skip = (pageNumber - 1);

        const resources = await db.resources.findMany(
            {
                skip,
                take: offsetNumber,
                where: {
                    subjectId: subjectId || undefined,
                    ResourcesDetails: {
                        year: year as SubjectYear || undefined
                    }
                },
                include: {
                    subject: {
                        select: {
                            fullName: true,
                            shortName: true
                        },
                    },
                    ResourcesDetails: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        );
        const totalResources = await db.resources.count();
        const totalPages = Math.ceil(totalResources / offsetNumber);
        return { totalResources, totalPages, resources };
    } catch (error: any) {
        throw new Error(error.message);
    }
}


export const getResourcesById = async (id: string) => {
    try {
        const resource = await db.resources.findUnique({
            where: {
                id
            },
            include: {
                subject: {
                    select: {
                        fullName: true,
                        shortName: true
                    },
                },
                ResourcesDetails: true
            }
        });
        if (!resource) throw new Error("Resource not found");
        return resource;
    } catch (error: any) {
        throw new Error(error.message);
    }
}


export const ResourcesToogleStatus = async (id: string, c: Context) => {
    try {
        const resource = await db.resources.findUnique({
            where: { id },
            select: { freemium: true },
        });

        if (!resource) {
            return c.json({ message: "Resource not found" }, 404);
        }
        const newStatus = resource.freemium === "Premium" ? "Free" : "Premium";

        await db.resources.update({
            where: { id },
            data: { freemium: newStatus },
        });

        if (!resource) throw new Error("Resource not found");
        return { resource, newStatus };
    } catch (error: any) {
        throw new Error(error.message);
    }
}