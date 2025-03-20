import fs from 'fs/promises'; // Use fs.promises for async operations
import path from 'path';

export const createPDFBufferFromFile = async (filePath: string): Promise<Buffer | null> => {
  try {
    const fileBuffer = await fs.readFile(filePath);
    return fileBuffer;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return null; // Or throw the error if you prefer
  }
};