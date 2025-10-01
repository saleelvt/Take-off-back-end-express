
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Membership } from "@/infrastructure/database/models/memberShipSchema";

export const adminDeleteMembershipByIdController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
        try {
            const { id } = req.params;
            
            console.log(`🗑️ Deleting project with ID: ${id}`);
            
            // Find and delete project by ID
            const deletedProject = await Membership.findByIdAndDelete(id);
            
            if (!deletedProject) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }
            
        
            
            return res.status(200).json({
                success: true,
                message: "Project deleted successfully",
               
            });
            
        } catch (error) {
            console.error("❌ Failed to delete project:", error);
            
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