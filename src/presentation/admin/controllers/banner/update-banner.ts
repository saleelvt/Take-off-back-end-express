import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Banner } from "@/infrastructure/database/models/bannerSchema";
import { uploadFileToS3, generateImageKey, getMimeTypeFromFilename } from "@/utilities/aws/s3";

export const adminEditBannerController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const { id } = req.params;
            const { heading, description } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Banner ID is required"
                });
            }

            // Prepare update data
            const updateData: any = {
                heading,
                description
            };

            // Check if new image is uploaded
            if (req.file) {
                // Generate unique key for S3
                const imageKey = generateImageKey('banners', req.file.originalname);
                
                // Get MIME type
                const mimeType = req.file.mimetype || getMimeTypeFromFilename(req.file.originalname);

                // Upload new image to S3
                const imageUrl = await uploadFileToS3(
                    req.file.buffer,
                    imageKey,
                    mimeType
                );

                // Add image URL to update data
                updateData.image = imageUrl;
            }

            // Find and update the banner
            const updatedBanner = await Banner.findByIdAndUpdate(
                id,
                updateData,
                { 
                    new: true, // Return the updated document
                    runValidators: true // Run schema validators
                }
            );

            if (!updatedBanner) {
                return res.status(404).json({
                    success: false,
                    message: "Banner not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Banner updated successfully!",
                data: updatedBanner
            });

        } catch (error: any) {
            console.error("❌ Failed to update banner:", error);

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