import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { VerifiedMembership } from "@/infrastructure/database/models/verifiedMemberSchema";

export const adminAddMemberController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            const {
                name,
                title,
                company,
                industry,
                location,
                email,
                phone,
                website,
                discount,
                linkedIn
            } = req.body;

            // Create a new document
            const newMember = new VerifiedMembership({
                name,
                title,
                company,
                industry,
                location,
                email,
                phone,
                website,
                linkedIn,
                discount
            });

            // Save to database
            const savedMember = await newMember.save();

            return res.status(201).json({
                success: true,
                message: "Membership created successfully!",
                data: savedMember
            });

        } catch (error: any) {
            console.error("❌ Failed to create membership:", error);

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
