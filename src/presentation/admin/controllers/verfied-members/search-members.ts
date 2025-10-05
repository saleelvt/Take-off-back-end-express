import { VerifiedMembership } from "@/infrastructure/database/models/verifiedMemberSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminSearchMembersController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            
            const { name, company, industry } = req.query;

            // Build search query
            const searchQuery: any = {};

            if (name) {
                searchQuery.name = { $regex: name as string, $options: 'i' };
            }

            if (company) {
                searchQuery.company = { $regex: company as string, $options: 'i' };
            }

            if (industry) {
                searchQuery.industry = { $regex: industry as string, $options: 'i' };
            }

            // If no search parameters provided, return all members
            const searchCriteria = Object.keys(searchQuery).length > 0 ? searchQuery : {};

            const members = await VerifiedMembership.find(searchCriteria)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            
            const total = await VerifiedMembership.countDocuments(searchCriteria);

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
        } catch (error) {
            console.error("❌ Failed to search members:", error);
            next(error);
        }
    };
};
