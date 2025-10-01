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
exports.adminDeleteProjectController = void 0;
const projectSchema_1 = __importDefault(require("@/infrastructure/database/models/projectSchema"));
const adminDeleteProjectController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log(`🗑️ Deleting project with ID: ${id}`);
            // Find and delete project by ID
            const deletedProject = yield projectSchema_1.default.findByIdAndDelete(id);
            if (!deletedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }
            console.log(`✅ Project deleted: ${deletedProject.projectName}`);
            return res.status(200).json({
                success: true,
                message: "Project deleted successfully",
                data: {
                    id: deletedProject._id,
                    projectName: deletedProject.projectName
                }
            });
        }
        catch (error) {
            console.error("❌ Failed to delete project:", error);
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
exports.adminDeleteProjectController = adminDeleteProjectController;
