import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

const MAIN_PARENT_FOLDER_NAME = "My_Main_Folder"; // 📂 Change this as needed

export const uploadFileToDrive = async (file: File, subfolderName: string): Promise<string | null> => {
    try {
        const drive = google.drive({
            version: 'v3',
            auth: new google.auth.GoogleAuth({
                keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
                scopes: ['https://www.googleapis.com/auth/drive'],
            }),
        });

        // Step 1: Get or create the main parent folder
        let parentFolderId: string | null = await getOrCreateFolder(drive, MAIN_PARENT_FOLDER_NAME, null);
        if (!parentFolderId) throw new Error('Failed to create/find the parent folder.');

        // Step 2: Get or create the subfolder inside the parent folder
        let subfolderId: string | null = await getOrCreateFolder(drive, subfolderName, parentFolderId);
        if (!subfolderId) throw new Error('Failed to create/find the subfolder.');

        // Convert File to Buffer
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Convert Buffer to Readable Stream
        const fileStream = Readable.from(fileBuffer);

        // Generate a unique file name
        const randomFileName = `${uuidv4()}_${file.name}`;

        // Step 3: Upload file inside the subfolder
        const response = await drive.files.create({
            requestBody: {
                name: randomFileName,
                mimeType: 'application/pdf',
                parents: [subfolderId], // ✅ Upload inside the created subfolder
            },
            media: {
                mimeType: 'application/pdf',
                body: fileStream,
            },
        });

        if (!response.data.id) throw new Error('File upload failed.');

        const fileId = response.data.id;

        // Step 4: Set file permissions (viewable but not downloadable)
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Step 5: Restrict download, printing, and copying
        await drive.files.update({
            fileId,
            requestBody: {
                copyRequiresWriterPermission: true, // Prevent copying
                viewersCanCopyContent: false, // Prevent download & copy
            },
        });
        const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        // Step 6: Get the webViewLink
        const fileMetadata = await drive.files.get({
            fileId,
            fields: 'webViewLink',
        });

        return previewUrl || null;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};

// 📌 Helper Function: Get or Create Folder
const getOrCreateFolder = async (drive: any, folderName: string, parentFolderId: string | null): Promise<string | null> => {
    try {
        const query = parentFolderId
            ? `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed = false`
            : `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed = false`;

        const folderList = await drive.files.list({
            q: query,
            fields: 'files(id)',
        });

        if (folderList.data.files.length > 0) {
            return folderList.data.files[0].id;
        }

        const folderResponse = await drive.files.create({
            requestBody: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: parentFolderId ? [parentFolderId] : [],
            },
            fields: 'id',
        });

        return folderResponse.data.id || null;
    } catch (error) {
        console.error('Error checking/creating folder:', error);
        return null;
    }
};
