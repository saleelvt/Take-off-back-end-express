import { Banner } from "@/infrastructure/database/models/bannerSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminDeleteBannerController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Banner ID is required"
                });
                return;
            }

            const deletedBanner = await Banner.findByIdAndDelete(id);

            if (!deletedBanner) {
                res.status(404).json({
                    success: false,
                    message: "Verified Banner not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Verified Banner deleted successfully",
                data: deletedBanner
            });
        } catch (error) {
            console.error("❌ Failed to delete verified Banner:", error);
            next(error);
        }
    };
};