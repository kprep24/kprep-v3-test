import { Hono } from "hono";
import { google } from 'googleapis';
import fs from 'fs';


export const drive = new Hono()
    .post("/", async (c) => {
        try {
            // const { file } = await c.
            console.log("THIS IS DRIven")
            const auth = new google.auth.GoogleAuth({
                keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to your service account key
                scopes: ['https://www.googleapis.com/auth/drive'],
            });

            const drive = google.drive({
                version: 'v3', auth: new google.auth.GoogleAuth({
                    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
                    scopes: ['https://www.googleapis.com/auth/drive'],
                })
            })
            // console.log('authClient:', authClient);
            // console.log('drive:', drive);

            const filePath = './public/examschedule2nd.pdf'; // Adjust the path
            const fileStream = fs.createReadStream(filePath);
            const folderResponse = await drive.files.create({
                requestBody: {
                    name: "AVIKTEST",
                    mimeType: 'application/vnd.google-apps.folder',
                },
            });
            const folderId = folderResponse.data.id;
            console.log(folderId)
            // 3. Upload the PDF to Google Drive
            const response = await drive.files.create({
                requestBody: {
                    name: 'Uploaded PDF.pdf', // Name of the file in Google Drive
                    mimeType: 'application/pdf',
                    parents: ["1GSB-0OblJRAdGH1xhed__MiqoXU_3cYb"]
                },
                media: {
                    mimeType: 'application/pdf',
                    body: fileStream,
                },
            });
            let fileMetadata;
            if (response.data.id) {
                await drive.permissions.create({
                    fileId: response.data.id,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone',
                    },
                });
                fileMetadata = await drive.files.get({
                    fileId: response.data.id,
                    fields: 'webViewLink',
                });
            }
            if (!fileMetadata) {
                return c.json({ message: "a" })
            }
            // console.log(response)
            return c.json({ fileId: response.data.id, message: 'PDF uploaded successfully', webViewLink: fileMetadata.data.webViewLink, });
        } catch (error: any) {
            console.log(error)
            return c.json({ error: error.message || "Internal server error" });
        }
    })