import { FounderProfile } from "@/infrastructure/database/models/founderProfileSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminDeleteFounderProfileController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Founder profile ID is required"
                });
                return;
            }

            const deletedFounderProfile = await FounderProfile.findByIdAndDelete(id);

            if (!deletedFounderProfile) {
                res.status(404).json({
                    success: false,
                    message: "Founder profile not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Founder profile deleted successfully",
                data: deletedFounderProfile
            });
        } catch (error) {
            console.error("❌ Failed to delete founder profile:", error);
            next(error);
        }
    };
};
