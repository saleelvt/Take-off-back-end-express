import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { EventDetails } from "@/infrastructure/database/models/eventSchema";
import { uploadFileToS3, generateImageKey, getMimeTypeFromFilename } from "@/utilities/aws/s3";

export const adminAddEventController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const {
                dateLabel,
                isRegular,
                title,
                type,
                description,
                eventDate,
                eventTime,
                location
            } = req.body;

            // Check if file is uploaded
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Event image file is required"
                });
            }

            // Generate unique key for S3
            const imageKey = generateImageKey('events', req.file.originalname);
            
            // Get MIME type
            const mimeType = req.file.mimetype || getMimeTypeFromFilename(req.file.originalname);

            // Upload image to S3
            const imageUrl = await uploadFileToS3(
                req.file.buffer,
                imageKey,
                mimeType
            );

            // Create a new event document with S3 image URL
            const newEvent = new EventDetails({
                imageUrl, // Store S3 URL in database
                dateLabel,
                isRegular: isRegular === 'true' || isRegular === true,
                title,
                type,
                description,
                eventDate,
                eventTime,
                location
            });

            // Save to database
            const savedEvent = await newEvent.save();

            return res.status(201).json({
                success: true,
                message: "Event created successfully!",
                data: savedEvent
            });

        } catch (error: any) {
            console.error("❌ Failed to create event:", error);

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
                    message: "Event already exists"
                });
            }

            // Pass error to the next error handler
            next(error);
        }
    };
};
