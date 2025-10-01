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
exports.adminGetSingleProjectController = void 0;
const projectSchema_1 = __importDefault(require("@/infrastructure/database/models/projectSchema"));
// Get all projects - simple version
const adminGetSingleProjectController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log(`🔍 Fetching project with ID: ${id}`);
            // Find project by ID
            const project = yield projectSchema_1.default.findById(id).select('-__v');
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }
            console.log(`✅ Project found: ${project.projectName}`);
            return res.status(200).json({
                success: true,
                message: "Project fetched successfully",
                data: project
            });
        }
        catch (error) {
            console.error("❌ Failed to fetch project:", error);
            // Handle invalid ID format error
            if (error.name === 'CastError') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid project ID"
                });
            }
            next(error);
        }
    });
};
exports.adminGetSingleProjectController = adminGetSingleProjectController;
