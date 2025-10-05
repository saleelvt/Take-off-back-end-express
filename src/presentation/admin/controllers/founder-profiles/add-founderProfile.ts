import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { FounderProfile } from "@/infrastructure/database/models/founderProfileSchema";
import { uploadFileToS3, generateImageKey, getMimeTypeFromFilename } from "@/utilities/aws/s3";

export const adminAddFounderProfileController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const {
                badge,
                fullName,
                role,
                summary,
                achievements,
                socialLinks
            } = req.body;

            // Check if file is uploaded
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Founder profile image file is required"
                });
            }

            // Generate unique key for S3
            const imageKey = generateImageKey('founder-profiles', req.file.originalname);
            
            // Get MIME type
            const mimeType = req.file.mimetype || getMimeTypeFromFilename(req.file.originalname);

            // Upload image to S3
            const imageUrl = await uploadFileToS3(
                req.file.buffer,
                imageKey,
                mimeType
            );

            // Parse achievements array if it's a string
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

            // Parse socialLinks if it's a string
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

            // Create a new founder profile document with S3 image URL
            const newFounderProfile = new FounderProfile({
                imageUrl, // Store S3 URL in database
                badge,
                fullName,
                role,
                summary,
                achievements: achievementsArray,
                socialLinks: socialLinksObj
            });

            // Save to database
            const savedFounderProfile = await newFounderProfile.save();

            return res.status(201).json({
                success: true,
                message: "Founder profile created successfully!",
                data: savedFounderProfile
            });

        } catch (error: any) {
            console.error("❌ Failed to create founder profile:", error);

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
