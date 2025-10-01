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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAddProjectController = void 0;
const s3_1 = require("@/utilities/aws/s3");
const projectSchema_1 = __importDefault(require("@/infrastructure/database/models/projectSchema"));
const adminAddProjectController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const files = req.files;
            // Validate required files
            if (!files || !files.mainImg || !files.backGroundImage) {
                return res.status(400).json({
                    success: false,
                    message: "Main image and background image are required"
                });
            }
            // Parse services arrays
            let servicesProvided = [];
            let servicesProvidedAr = [];
            try {
                servicesProvided = JSON.parse(req.body.servicesProvided || '[]');
                servicesProvidedAr = JSON.parse(req.body.servicesProvidedAr || '[]');
            }
            catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid services data format"
                });
            }
            // Validate required fields
            const requiredFields = [
                'projectName', 'projectNameAr', 'description', 'descriptionAr',
                'heading', 'headingAr', 'industryName', 'industryNameAr',
                'service', 'serviceAr', 'category', 'categoryAr',
                'scopDiscription', 'scopDiscriptionAr',
                'challenges', 'challengesAr'
            ];
            for (const field of requiredFields) {
                if (!((_a = req.body[field]) === null || _a === void 0 ? void 0 : _a.trim())) {
                    return res.status(400).json({
                        success: false,
                        message: `${field} is required`
                    });
                }
            }
            if (servicesProvided.length === 0 || servicesProvidedAr.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "At least one service must be provided in both languages"
                });
            }
            // Upload main image to S3
            const mainImgFile = files.mainImg[0];
            const mainImgKey = `projects/main-images/${Date.now()}-${mainImgFile.originalname}`;
            const mainImgUrl = yield (0, s3_1.uploadFileToS3)(mainImgFile.buffer, mainImgKey, mainImgFile.mimetype);
            // Upload background image to S3
            const bgImgFile = files.backGroundImage[0];
            const bgImgKey = `projects/background-images/${Date.now()}-${bgImgFile.originalname}`;
            const bgImgUrl = yield (0, s3_1.uploadFileToS3)(bgImgFile.buffer, bgImgKey, bgImgFile.mimetype);
            // Upload additional images to S3 (if any)
            const additionalImageUrls = [];
            if (files.images && files.images.length > 0) {
                for (let i = 0; i < files.images.length; i++) {
                    const imgFile = files.images[i];
                    const imgKey = `projects/additional-images/${Date.now()}-${i}-${imgFile.originalname}`;
                    const imgUrl = yield (0, s3_1.uploadFileToS3)(imgFile.buffer, imgKey, imgFile.mimetype);
                    additionalImageUrls.push(imgUrl);
                }
            }
            // Create new project with S3 URLs
            const newProject = new projectSchema_1.default({
                projectName: req.body.projectName.trim(),
                projectNameAr: req.body.projectNameAr.trim(),
                description: req.body.description.trim(),
                descriptionAr: req.body.descriptionAr.trim(),
                mainImg: mainImgUrl,
                backGroundImage: bgImgUrl,
                heading: req.body.heading.trim(),
                headingAr: req.body.headingAr.trim(),
                industryName: req.body.industryName.trim(),
                industryNameAr: req.body.industryNameAr.trim(),
                service: req.body.service.trim(),
                serviceAr: req.body.serviceAr.trim(),
                category: req.body.category.trim(),
                categoryAr: req.body.categoryAr.trim(),
                scopDiscription: req.body.scopDiscription.trim(),
                scopDiscriptionAr: req.body.scopDiscriptionAr.trim(),
                challenges: req.body.challenges.trim(),
                challengesAr: req.body.challengesAr.trim(),
                servicesProvided: servicesProvided,
                servicesProvidedAr: servicesProvidedAr,
                images: additionalImageUrls
            });
            // Save to database
            const savedProject = yield newProject.save();
            console.log("✅ Project saved to database with ID:", savedProject._id);
            return res.status(201).json({
                success: true,
                message: "Project created successfully!",
                data: {
                    projectId: savedProject._id,
                    projectName: savedProject.projectName,
                    mainImg: savedProject.mainImg,
                }
            });
        }
        catch (error) {
            console.error("❌ Failed to create project:", error);
            // Handle specific errors
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: error.errors
                });
            }
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Project with this name already exists"
                });
            }
            // Pass error to the next error handler
            next(error);
        }
    });
};
exports.adminAddProjectController = adminAddProjectController;
