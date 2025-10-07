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
exports.adminSearchMembersController = void 0;
const verifiedMemberSchema_1 = require("@/infrastructure/database/models/verifiedMemberSchema");
const adminSearchMembersController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const { name, company, industry } = req.query;
            // Build search query
            const searchQuery = {};
            if (name) {
                searchQuery.name = { $regex: name, $options: 'i' };
            }
            if (company) {
                searchQuery.company = { $regex: company, $options: 'i' };
            }
            if (industry) {
                searchQuery.industry = { $regex: industry, $options: 'i' };
            }
            // If no search parameters provided, return all members
            const searchCriteria = Object.keys(searchQuery).length > 0 ? searchQuery : {};
            const members = yield verifiedMemberSchema_1.VerifiedMembership.find(searchCriteria)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            const total = yield verifiedMemberSchema_1.VerifiedMembership.countDocuments(searchCriteria);
            res.status(200).json({
                success: true,
                data: members,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                },
                searchCriteria: {
                    name: name || null,
                    company: company || null,
                    industry: industry || null
                }
            });
        }
        catch (error) {
            console.error("❌ Failed to search members:", error);
            next(error);
        }
    });
};
exports.adminSearchMembersController = adminSearchMembersController;
