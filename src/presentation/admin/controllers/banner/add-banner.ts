// adminAddBannerController.ts
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Banner } from "@/infrastructure/database/models/bannerSchema";
import { uploadFileToS3, generateImageKey, getMimeTypeFromFilename } from "@/utilities/aws/s3";

export const adminAddBannerController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const { heading, description } = req.body;

            // Check if file is uploaded
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Image file is required"
                });
            }

            // Generate unique key for S3
            const imageKey = generateImageKey('banners', req.file.originalname);
            
            // Get MIME type
            const mimeType = req.file.mimetype || getMimeTypeFromFilename(req.file.originalname);

            // Upload image to S3
            const imageUrl = await uploadFileToS3(
                req.file.buffer,
                imageKey,
                mimeType
            );

            // Create a new banner document with S3 image URL
            const newBanner = new Banner({
                heading,
                description,
                image: imageUrl // Store S3 URL in database
            });

            // Save to database
            const savedBanner = await newBanner.save();

            return res.status(201).json({
                success: true,
                message: "Banner created successfully!",
                data: savedBanner
            });

        } catch (error: any) {
            console.error("❌ Failed to create banner:", error);

            // Handle S3 upload errors
            if (error.message?.includes('Image upload failed')) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }

            // Handle invalid image type
            if (error.message?.includes('Invalid image type')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            // Handle duplicate error
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Banner already exists"
                });
            }

            // Pass error to the next error handler
            next(error);
        }
    };
};