"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAddFounderProfileController = void 0;
const founderProfileSchema_1 = require("@/infrastructure/database/models/founderProfileSchema");
const s3_1 = require("@/utilities/aws/s3");
const adminAddFounderProfileController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { badge, fullName, role, summary, achievements, socialLinks } = req.body;
            // Check if file is uploaded
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Founder profile image file is required"
                });
            }
            // Generate unique key for S3
            const imageKey = (0, s3_1.generateImageKey)('founder-profiles', req.file.originalname);
            // Get MIME type
            const mimeType = req.file.mimetype || (0, s3_1.getMimeTypeFromFilename)(req.file.originalname);
            // Upload image to S3
            const imageUrl = yield (0, s3_1.uploadFileToS3)(req.file.buffer, imageKey, mimeType);
            // Parse achievements array if it's a string
            let achievementsArray = [];
            if (typeof achievements === 'string') {
                try {
                    achievementsArray = JSON.parse(achievements);
                }
                catch (error) {
                    achievementsArray = achievements.split(',').map(a => a.trim());
                }
            }
            else if (Array.isArray(achievements)) {
                achievementsArray = achievements;
            }
            // Parse socialLinks if it's a string
            let socialLinksObj = {};
            if (typeof socialLinks === 'string') {
                try {
                    socialLinksObj = JSON.parse(socialLinks);
                }
                catch (error) {
                    socialLinksObj = { linkedIn: socialLinks };
                }
            }
            else if (typeof socialLinks === 'object') {
                socialLinksObj = socialLinks;
            }
            // Create a new founder profile document with S3 image URL
            const newFounderProfile = new founderProfileSchema_1.FounderProfile({
                imageUrl, // Store S3 URL in database
                badge,
                fullName,
                role,
                summary,
                achievements: achievementsArray,
                socialLinks: socialLinksObj
            });
            // Save to database
            const savedFounderProfile = yield newFounderProfile.save();
            return res.status(201).json({
                success: true,
                message: "Founder profile created successfully!",
                data: savedFounderProfile
            });
        }
        catch (error) {
            console.error("❌ Failed to create founder profile:", error);
            // Handle S3 upload errors
            if ((_a = error.message) === null || _a === void 0 ? void 0 : _a.includes('Image upload failed')) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
            // Handle invalid image type
            if ((_b = error.message) === null || _b === void 0 ? void 0 : _b.includes('Invalid image type')) {
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
    });
};
exports.adminAddFounderProfileController = adminAddFounderProfileController;
