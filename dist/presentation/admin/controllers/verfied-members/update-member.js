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
exports.adminEditMemberController = void 0;
const verifiedMemberSchema_1 = require("@/infrastructure/database/models/verifiedMemberSchema");
const adminEditMemberController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, title, company, industry, location, email, phone, website, discount } = req.body;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Member ID is required"
                });
            }
            // Find and update the member
            const updatedMember = yield verifiedMemberSchema_1.VerifiedMembership.findByIdAndUpdate(id, {
                name,
                title,
                company,
                industry,
                location,
                email,
                phone,
                website,
                discount
            }, {
                new: true, // Return the updated document
                runValidators: true // Run schema validators
            });
            if (!updatedMember) {
                return res.status(404).json({
                    success: false,
                    message: "Verified member not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Member updated successfully!",
                data: updatedMember
            });
        }
        catch (error) {
            console.error("❌ Failed to update member:", error);
            // Handle duplicate email error
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Member with this email already exists"
                });
            }
            // Pass error to the next error handler
            next(error);
        }
    });
};
exports.adminEditMemberController = adminEditMemberController;
