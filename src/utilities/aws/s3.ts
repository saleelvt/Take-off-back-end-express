import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Create an S3 client using AWS SDK v3.
 */
const s3Client = new S3Client({ 
  region: process.env.AWS_REGION,
  credentials: { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Upload an image file to S3 using AWS SDK v3.
 * @param fileBuffer - The buffer of the image file to be uploaded.
 * @param fileKey - The full S3 key/path for the file.
 * @param mimeType - The MIME type of the image.
 * @returns The public URL of the uploaded image.
 */
export const uploadFileToS3 = async (
  fileBuffer: Buffer, 
  fileKey: string, 
  mimeType: string
): Promise<string> => {
  try {
    // Validate that it's an image MIME type
    const allowedImageTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff'
    ];

    if (!allowedImageTypes.includes(mimeType.toLowerCase())) {
      throw new Error(`Invalid image type: ${mimeType}. Allowed types: ${allowedImageTypes.join(', ')}`);
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: mimeType,
      // ⭐ ACL REMOVED - This was causing the error!
      // The bucket policy will handle public access instead
    };

    console.log(`📤 Uploading image to S3: ${fileKey}`);
    console.log(`📝 MIME Type: ${mimeType}`);
    console.log(`📊 File Size: ${(fileBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    // Use S3Client to upload the image file
    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);

    // Construct the public URL
    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    
    console.log(`✅ Image uploaded successfully: ${fileUrl}`);
    
    return fileUrl;
    
  } catch (error) {
    console.error("❌ Error uploading image to S3:", error);
    
    // Provide more specific error messages
    if (error.name === 'CredentialsError') {
      throw new Error("AWS credentials are invalid or missing");
    } else if (error.name === 'NetworkError') {
      throw new Error("Network error occurred while uploading to S3");
    } else if (error.message?.includes('Invalid image type')) {
      throw error;
    } else {
      throw new Error(`Image upload failed: ${error.message || 'Unknown error'}`);
    }
  }
};

/**
 * Helper function to generate unique file key for S3
 */
export const generateImageKey = (folder: string, originalFilename: string): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 15);
  const fileExtension = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  return `${folder}/${timestamp}-${randomSuffix}-${cleanFilename}`;
};

/**
 * Helper function to get MIME type from file extension
 */
export const getMimeTypeFromFilename = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const mimeTypes: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'tif': 'image/tiff'
  };
  
  return mimeTypes[extension || ''] || 'image/jpeg';
};