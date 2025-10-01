"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// 2. Define schema
const ProjectSchema = new mongoose_1.Schema({
    projectName: { type: String, required: true, trim: true },
    projectNameAr: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    mainImg: { type: String, required: true }, // S3 URL
    backGroundImage: { type: String, required: true }, // S3 URL
    heading: { type: String, required: true },
    headingAr: { type: String, required: true },
    industryName: { type: String, required: true },
    industryNameAr: { type: String, required: true },
    service: { type: String, required: true },
    serviceAr: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    categoryAr: { type: String, required: true, trim: true },
    scopDiscription: { type: String, required: true },
    scopDiscriptionAr: { type: String, required: true },
    challenges: { type: String, required: true },
    challengesAr: { type: String, required: true },
    servicesProvided: { type: [String], required: true }, // array of strings
    servicesProvidedAr: { type: [String], required: true }, // array of strings
    images: { type: [String], default: [] } // array of S3 URLs
}, { timestamps: true });
// 3. Create model
const Project = mongoose_1.default.model("Project", ProjectSchema);
exports.default = Project;
