"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membership = void 0;
const mongoose_1 = require("mongoose");
// Mongoose Schema
const MembershipSchema = new mongoose_1.Schema({
    personalInfo: {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        phone: { type: String },
        nationality: { type: String },
        linkedin: { type: String }
    },
    businessInfo: {
        companyName: { type: String },
        position: { type: String },
        industry: { type: String },
        companySize: { type: String },
        businessType: { type: String },
        primaryLocation: { type: String },
        companyWebsite: { type: String },
        companyDescription: { type: String }
    },
    interests: {
        programInterests: { type: [String] },
        businessGoals: { type: String },
        referralSource: { type: String },
        volunteeringInterested: { type: Boolean },
        contributionIdeas: { type: String }
    }
}, {
    timestamps: true
});
exports.Membership = (0, mongoose_1.model)("Membership", MembershipSchema);
