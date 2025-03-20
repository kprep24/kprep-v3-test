import { subject } from "@/app/api/[[...route]]";
import { db } from "@/lib/db";
import { SubjectYear } from "@prisma/client";

interface IcreatePlaylist {
    subjectId: string;
    userId: string;
    title: string;
    link: string;
    courseId: string;
    chName: string, noOfVideos: string, rating: string
}
interface IPlaylistByYear extends Pick<IcreatePlaylist, 'courseId'> {
    year: SubjectYear;
    branchId: string;
}
interface IUpdatePlaylist extends IcreatePlaylist {
    playlistId: string;
}

export const createPlaylist = async ({ subjectId, userId, title, link, courseId, chName, noOfVideos, rating }: IcreatePlaylist) => {
    try {
        await db.playlist.create({
            data: {
                subjectId,
                addedById: userId,
                title,
                link,
                courseId,
                visibility: "Public",
                chName,
                noOfVideos: Number(noOfVideos),
                rating: parseFloat(rating)
            }
        })
    } catch (error: any) {
        throw new Error(error.message || "Error on creating");
    }
}

export const getPlaylists = async () => {
    try {
        return await db.playlist.findMany({
            include: {
                subject: true,
            },
        });
    } catch (error: any) {
        throw new Error(error.message || "Error on creating");
    }
}

export const getPlaylistsByYear = async ({ year, courseId, branchId }: IPlaylistByYear) => {
    try {
        const subjects = await db.subject.findMany({
            where: {
                year: year,
                subjectDetails: {
                    courseId,
                    branchId: {
                        has: branchId
                    }
                }
            },
            select: {
                id: true,
            }
        })
        return await db.playlist.findMany({
            where: {
                subjectId: { in: subjects.map(subject => subject.id) },
                courseId
            }
        });
    } catch (error: any) {
        throw new Error(error.message || "Error on creating");
    }
}
export const deletePlaylist = async (deleteId: string) => {
    try {
        await db.playlist.delete({ where: { id: deleteId } })
    } catch (error: any) {
        throw new Error(error.message || "Error on deleting")
    }
}

export const updatePlaylist = async ({ playlistId, title, link, courseId, subjectId }: IUpdatePlaylist) => {
    try {
        await db.playlist.update({
            where: { id: playlistId },
            data: { title, link, courseId, subjectId }
        })
    } catch (error: any) {
        throw new Error(error.message || "Error on updating")
    }
}

export const getAllTopics = async (subjectId: string | undefined, year: SubjectYear) => {
    try {
        console.log("YEAR is " + year)
        if (subjectId === undefined) {
            return await db.playlist.findMany({
                where: {
                    subject: {
                        year
                    }
                },
                include: {
                    subject: {
                        select: {
                            fullName: true
                        }
                    }
                }
            })
        } else {
            return await db.playlist.findMany({
                where: {
                    subjectId: subjectId || undefined, subject: {
                        year
                    }
                },
                include: {
                    // include: {
                        subject: {
                            select: {
                                fullName: true
                            }
                        }
                    // }
                }
            })
        }
    } catch (error: any) {
        throw new Error(error.message || "Error on fetching")
    }
}