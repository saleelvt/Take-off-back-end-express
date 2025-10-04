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
exports.adminGetMemberController = void 0;
const verifiedMemberSchema_1 = require("@/infrastructure/database/models/verifiedMemberSchema");
// Controller returning the first 10 company names from the database
const adminGetMemberController = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Fetch only the `company` field, limit to 10 results
            const companies = yield verifiedMemberSchema_1.VerifiedMembership.find({}, { company: 1, _id: 0 })
                .limit(10)
                .exec();
            if (!companies || companies.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No companies found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Companies retrieved successfully!",
                data: companies
            });
        }
        catch (error) {
            console.error("❌ Failed to get companies:", error);
            next(error);
        }
    });
};
exports.adminGetMemberController = adminGetMemberController;
