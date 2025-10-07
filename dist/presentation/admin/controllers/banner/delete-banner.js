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
exports.adminDeleteBannerController = void 0;
const bannerSchema_1 = require("@/infrastructure/database/models/bannerSchema");
const adminDeleteBannerController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Banner ID is required"
                });
                return;
            }
            const deletedBanner = yield bannerSchema_1.Banner.findByIdAndDelete(id);
            if (!deletedBanner) {
                res.status(404).json({
                    success: false,
                    message: "Verified Banner not found"
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Verified Banner deleted successfully",
                data: deletedBanner
            });
        }
        catch (error) {
            console.error("❌ Failed to delete verified Banner:", error);
            next(error);
        }
    });
};
exports.adminDeleteBannerController = adminDeleteBannerController;
