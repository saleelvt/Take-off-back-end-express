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
exports.adminDeleteFounderProfileController = void 0;
const founderProfileSchema_1 = require("@/infrastructure/database/models/founderProfileSchema");
const adminDeleteFounderProfileController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Founder profile ID is required"
                });
                return;
            }
            const deletedFounderProfile = yield founderProfileSchema_1.FounderProfile.findByIdAndDelete(id);
            if (!deletedFounderProfile) {
                res.status(404).json({
                    success: false,
                    message: "Founder profile not found"
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Founder profile deleted successfully",
                data: deletedFounderProfile
            });
        }
        catch (error) {
            console.error("❌ Failed to delete founder profile:", error);
            next(error);
        }
    });
};
exports.adminDeleteFounderProfileController = adminDeleteFounderProfileController;
