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
exports.adminUpdateMemberShipByIdController = void 0;
const memberShipSchema_1 = require("@/infrastructure/database/models/memberShipSchema");
const adminUpdateMemberShipByIdController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, phone, nationality, linkedin, companyName, position, industry, companySize, businessType, primaryLocation, companyWebsite, companyDescription, programInterests, businessGoals, referralSource, volunteeringInterested, contributionIdeas } = req.body;
            // Check if email already exists
            const existingMember = yield memberShipSchema_1.Membership.findOne({ 'personalInfo.email': email });
            if (existingMember) {
                return res.status(400).json({
                    success: false,
                    message: "Member with this email already exists"
                });
            }
            // Create new membership
            const newMembership = new memberShipSchema_1.Membership({
                personalInfo: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    nationality,
                    linkedin
                },
                businessInfo: {
                    companyName,
                    position,
                    industry,
                    companySize,
                    businessType,
                    primaryLocation,
                    companyWebsite,
                    companyDescription
                },
                interests: {
                    programInterests,
                    businessGoals,
                    referralSource,
                    volunteeringInterested,
                    contributionIdeas
                }
            });
            // Save to database
            const savedMembership = yield newMembership.save();
            return res.status(201).json({
                success: true,
                message: "Membership created successfully!",
                data: savedMembership
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
exports.adminUpdateMemberShipByIdController = adminUpdateMemberShipByIdController;
