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
exports.adminDeleteMembershipByIdController = void 0;
const memberShipSchema_1 = require("@/infrastructure/database/models/memberShipSchema");
const adminDeleteMembershipByIdController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log(`🗑️ Deleting project with ID: ${id}`);
            // Find and delete project by ID
            const deletedProject = yield memberShipSchema_1.Membership.findByIdAndDelete(id);
            if (!deletedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Project deleted successfully",
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
exports.adminDeleteMembershipByIdController = adminDeleteMembershipByIdController;
