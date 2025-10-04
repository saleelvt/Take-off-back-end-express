import { VerifiedMembership } from "@/infrastructure/database/models/verifiedMemberSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminDeleteMemberController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Member ID is required"
                });
                return;
            }

            const deletedMember = await VerifiedMembership.findByIdAndDelete(id);

            if (!deletedMember) {
                res.status(404).json({
                    success: false,
                    message: "Verified member not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Verified member deleted successfully",
                data: deletedMember
            });
        } catch (error) {
            console.error("❌ Failed to delete verified member:", error);
            next(error);
        }
    };
};