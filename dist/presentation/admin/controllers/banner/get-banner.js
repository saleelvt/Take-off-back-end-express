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
exports.adminGetBannerController = void 0;
const bannerSchema_1 = require("@/infrastructure/database/models/bannerSchema");
const adminGetBannerController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verifiedMembers = yield bannerSchema_1.Banner.find();
            if (verifiedMembers.length == 0) {
                res.status(404).json({
                    success: false,
                    message: "banner not found"
                });
            }
            res.status(200).json({
                success: true,
                data: verifiedMembers,
            });
        }
        catch (error) {
            console.error("❌ Failed to fetch verified members:", error);
            next(error);
        }
    });
};
exports.adminGetBannerController = adminGetBannerController;
