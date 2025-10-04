import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { VerifiedMembership } from "@/infrastructure/database/models/verifiedMemberSchema";

export const adminEditMemberController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const { id } = req.params;
            const {
                name,
                title,
                company,
                industry,
                location,
                email,
                phone,
                website,
                discount
            } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Member ID is required"
                });
            }

            // Find and update the member
            const updatedMember = await VerifiedMembership.findByIdAndUpdate(
                id,
                {
                    name,
                    title,
                    company,
                    industry,
                    location,
                    email,
                    phone,
                    website,
                    discount
                },
                { 
                    new: true, // Return the updated document
                    runValidators: true // Run schema validators
                }
            );

            if (!updatedMember) {
                return res.status(404).json({
                    success: false,
                    message: "Verified member not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Member updated successfully!",
                data: updatedMember
            });

        } catch (error: any) {
            console.error("❌ Failed to update member:", error);

            // Handle duplicate email error
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Member with this email already exists"
                });
            }

            // Pass error to the next error handler
            next(error);
        }
    };
};