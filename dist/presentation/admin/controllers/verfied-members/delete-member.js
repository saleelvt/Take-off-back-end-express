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
exports.adminDeleteMemberController = void 0;
const verifiedMemberSchema_1 = require("@/infrastructure/database/models/verifiedMemberSchema");
const adminDeleteMemberController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Member ID is required"
                });
                return;
            }
            const deletedMember = yield verifiedMemberSchema_1.VerifiedMembership.findByIdAndDelete(id);
            if (!deletedMember) {
                res.status(404).json({
                    success: false,
                    message: "Verified member not found"
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Verified member deleted successfully",
                data: deletedMember
            });
        }
        catch (error) {
            console.error("❌ Failed to delete verified member:", error);
            next(error);
        }
    });
};
exports.adminDeleteMemberController = adminDeleteMemberController;
