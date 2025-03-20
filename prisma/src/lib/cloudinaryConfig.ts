// server/utils/uploadUtils.ts (Create a separate utility file)
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration (from environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function uploadToCloudinary(fileBuffer: Buffer, originalFilename: string): Promise<{ url: string; publicId: string } | null> {
  try {
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          // resource_type: 'raw',
          folder: 'pdfs'
        },
        (err, result) => {
          if (err || !result) {
            console.error("Cloudinary Error:", err);
            reject(err || new Error("Cloudinary upload failed"));
          } else {
            resolve(result);
          }
        }
      ).end(fileBuffer);
    });

    const result = cloudinaryResponse as { secure_url: string; public_id: string };

    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
}