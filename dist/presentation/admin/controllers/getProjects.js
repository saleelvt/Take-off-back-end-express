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
exports.adminGetProjectController = void 0;
const projectSchema_1 = __importDefault(require("@/infrastructure/database/models/projectSchema"));
// Get all projects - simple version
const adminGetProjectController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get all projects, sorted by newest first
            const projects = yield projectSchema_1.default.find()
                .sort({ createdAt: -1 })
                .select('-__v');
            console.log(`✅ Found ${projects.length} projects`);
            return res.status(200).json({
                success: true,
                message: "Projects fetched successfully",
                data: projects
            });
        }
        catch (error) {
            console.error("❌ Failed to fetch projects:", error);
            next(error);
        }
    });
};
exports.adminGetProjectController = adminGetProjectController;
