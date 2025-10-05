import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { FounderProfile } from "@/infrastructure/database/models/founderProfileSchema";
import { uploadFileToS3, generateImageKey, getMimeTypeFromFilename } from "@/utilities/aws/s3";

export const adminEditFounderProfileController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const { id } = req.params;
            const {
                badge,
                fullName,
                role,
                summary,
                achievements,
                socialLinks
            } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Founder profile ID is required"
                });
            }

            // Prepare update data
            const updateData: any = {
                badge,
                fullName,
                role,
                summary
            };

            // Parse achievements array if it's a string
            if (achievements) {
                let achievementsArray: string[] = [];
                if (typeof achievements === 'string') {
                    try {
                        achievementsArray = JSON.parse(achievements);
                    } catch (error) {
                        achievementsArray = achievements.split(',').map(a => a.trim());
                    }
                } else if (Array.isArray(achievements)) {
                    achievementsArray = achievements;
                }
                updateData.achievements = achievementsArray;
            }

            // Parse socialLinks if it's a string
            if (socialLinks) {
                let socialLinksObj = {};
                if (typeof socialLinks === 'string') {
                    try {
                        socialLinksObj = JSON.parse(socialLinks);
                    } catch (error) {
                        socialLinksObj = { linkedIn: socialLinks };
                    }
                } else if (typeof socialLinks === 'object') {
                    socialLinksObj = socialLinks;
                }
                updateData.socialLinks = socialLinksObj;
            }

            // Check if new image is uploaded
            if (req.file) {
                // Generate unique key for S3
                const imageKey = generateImageKey('founder-profiles', req.file.originalname);
                
                // Get MIME type
                const mimeType = req.file.mimetype || getMimeTypeFromFilename(req.file.originalname);

                // Upload new image to S3
                const imageUrl = await uploadFileToS3(
                    req.file.buffer,
                    imageKey,
                    mimeType
                );

                // Add image URL to update data
                updateData.imageUrl = imageUrl;
            }

            // Find and update the founder profile
            const updatedFounderProfile = await FounderProfile.findByIdAndUpdate(
                id,
                updateData,
                { 
                    new: true, // Return the updated document
                    runValidators: true // Run schema validators
                }
            );

            if (!updatedFounderProfile) {
                return res.status(404).json({
                    success: false,
                    message: "Founder profile not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Founder profile updated successfully!",
                data: updatedFounderProfile
            });

        } catch (error: any) {
            console.error("❌ Failed to update founder profile:", error);

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
                    message: "Founder profile already exists"
                });
            }

            // Pass error to the next error handler
            next(error);
        }
    };
};
