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
exports.adminEditBannerController = void 0;
const bannerSchema_1 = require("@/infrastructure/database/models/bannerSchema");
const s3_1 = require("@/utilities/aws/s3");
const adminEditBannerController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
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
            const updateData = {
                heading,
                description
            };
            // Check if new image is uploaded
            if (req.file) {
                // Generate unique key for S3
                const imageKey = (0, s3_1.generateImageKey)('banners', req.file.originalname);
                // Get MIME type
                const mimeType = req.file.mimetype || (0, s3_1.getMimeTypeFromFilename)(req.file.originalname);
                // Upload new image to S3
                const imageUrl = yield (0, s3_1.uploadFileToS3)(req.file.buffer, imageKey, mimeType);
                // Add image URL to update data
                updateData.image = imageUrl;
            }
            // Find and update the banner
            const updatedBanner = yield bannerSchema_1.Banner.findByIdAndUpdate(id, updateData, {
                new: true, // Return the updated document
                runValidators: true // Run schema validators
            });
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
        }
        catch (error) {
            console.error("❌ Failed to update banner:", error);
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
                    message: "Banner already exists"
                });
            }
            // Pass error to the next error handler
            next(error);
        }
    });
};
exports.adminEditBannerController = adminEditBannerController;
