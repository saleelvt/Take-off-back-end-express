import { EventDetails } from "@/infrastructure/database/models/eventSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminGetEventsController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            const events = await EventDetails.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            
            const total = await EventDetails.countDocuments();

            res.status(200).json({
                success: true,
                data: events,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            console.error("❌ Failed to fetch events:", error);
            next(error);
        }
    };
};
