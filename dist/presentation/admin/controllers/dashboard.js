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
exports.adminDashboardController = void 0;
const bannerSchema_1 = require("@/infrastructure/database/models/bannerSchema");
const eventSchema_1 = require("@/infrastructure/database/models/eventSchema");
const founderProfileSchema_1 = require("@/infrastructure/database/models/founderProfileSchema");
const memberShipSchema_1 = require("@/infrastructure/database/models/memberShipSchema");
const verifiedMemberSchema_1 = require("@/infrastructure/database/models/verifiedMemberSchema");
const adminDashboardController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get counts for all schemas
            const [bannerCount, eventCount, founderProfileCount, membershipCount, verifiedMembershipCount] = yield Promise.all([
                bannerSchema_1.Banner.countDocuments(),
                eventSchema_1.EventDetails.countDocuments(),
                founderProfileSchema_1.FounderProfile.countDocuments(),
                memberShipSchema_1.Membership.countDocuments(),
                verifiedMemberSchema_1.VerifiedMembership.countDocuments()
            ]);
            const dashboardData = {
                totals: {
                    banners: bannerCount,
                    events: eventCount,
                    founderProfiles: founderProfileCount,
                    memberships: membershipCount,
                    verifiedMemberships: verifiedMembershipCount
                },
                summary: {
                    totalRecords: bannerCount + eventCount + founderProfileCount + membershipCount + verifiedMembershipCount,
                    lastUpdated: new Date().toISOString()
                }
            };
            res.status(200).json({
                success: true,
                message: "Dashboard data retrieved successfully",
                data: dashboardData
            });
        }
        catch (error) {
            console.error("❌ Failed to fetch dashboard data:", error);
            next(error);
        }
    });
};
exports.adminDashboardController = adminDashboardController;
