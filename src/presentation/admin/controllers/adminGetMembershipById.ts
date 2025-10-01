
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Membership } from "@/infrastructure/database/models/memberShipSchema";

// Get all projects - simple version
export const adminGetMembershipByIdController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
        try {
            const { id } = req.params;
            
            console.log(`🔍 Fetching project with ID: ${id}`);
            
            // Find project by ID
            const project = await Membership.findById(id).select('-__v');
            
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Membership not found"
                });
            }
            
          
            
            return res.status(200).json({
                success: true,
                message: "Membership fetched successfully",
                data: project
            });
            
        } catch (error) {
            console.error("❌ Failed to fetch project:", error);
            
            // Handle invalid ID format error
            if (error.name === 'CastError') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid project ID"
                });
            }
            
            next(error);
        }
    };
};