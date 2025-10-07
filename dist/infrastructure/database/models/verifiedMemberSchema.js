"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedMembership = void 0;
const mongoose_1 = require("mongoose");
const BusinessCardSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: false },
    linkedIn: { type: String, required: false },
    discount: { type: String, required: false }
});
exports.VerifiedMembership = (0, mongoose_1.model)('VerifiedMembership', BusinessCardSchema);
