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
exports.adminGetMemberShipController = void 0;
const memberShipSchema_1 = require("../../../infrastructure/database/models/memberShipSchema");
const adminGetMemberShipController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const memberships = yield memberShipSchema_1.Membership.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            const total = yield memberShipSchema_1.Membership.countDocuments();
            res.status(200).json({
                success: true,
                data: memberships,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            });
        }
        catch (error) {
            console.error("❌ Failed to fetch memberships:", error);
            next(error);
        }
    });
};
exports.adminGetMemberShipController = adminGetMemberShipController;
