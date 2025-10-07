import { Banner } from "@/infrastructure/database/models/bannerSchema";
import { EventDetails } from "@/infrastructure/database/models/eventSchema";
import { FounderProfile } from "@/infrastructure/database/models/founderProfileSchema";
import { Membership } from "@/infrastructure/database/models/memberShipSchema";
import { VerifiedMembership } from "@/infrastructure/database/models/verifiedMemberSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminDashboardController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get counts for all schemas
            const [
                bannerCount,
                eventCount,
                founderProfileCount,
                membershipCount,
                verifiedMembershipCount
            ] = await Promise.all([
                Banner.countDocuments(),
                EventDetails.countDocuments(),
                FounderProfile.countDocuments(),
                Membership.countDocuments(),
                VerifiedMembership.countDocuments()
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
        } catch (error) {
            console.error("❌ Failed to fetch dashboard data:", error);
            next(error);
        }
    };
};
