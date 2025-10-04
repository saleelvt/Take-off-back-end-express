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
exports.adminAddMemberController = void 0;
const verifiedMemberSchema_1 = require("@/infrastructure/database/models/verifiedMemberSchema");
const adminAddMemberController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, title, company, industry, location, email, phone, website, discount } = req.body;
            // Create a new document
            const newMember = new verifiedMemberSchema_1.VerifiedMembership({
                name,
                title,
                company,
                industry,
                location,
                email,
                phone,
                website,
                discount
            });
            // Save to database
            const savedMember = yield newMember.save();
            return res.status(201).json({
                success: true,
                message: "Membership created successfully!",
                data: savedMember
            });
        }
        catch (error) {
            console.error("❌ Failed to create membership:", error);
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
exports.adminAddMemberController = adminAddMemberController;
