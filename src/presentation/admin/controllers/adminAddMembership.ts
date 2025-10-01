import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Membership } from "@/infrastructure/database/models/memberShipSchema";

export const adminAddMemberShipController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
        try {
            const {
                firstName,
                lastName,
                email,
                phone,
                nationality,
                linkedin,
                companyName,
                position,
                industry,
                companySize,
                businessType,
                primaryLocation,
                companyWebsite,
                companyDescription,
                programInterests,
                businessGoals,
                referralSource,
                volunteeringInterested,
                contributionIdeas
            } = req.body;

            // Check if email already exists
            const existingMember = await Membership.findOne({ 'personalInfo.email': email });
            if (existingMember) {
                return res.status(400).json({
                    success: false,
                    message: "Member with this email already exists"
                });
            }

            // Create new membership
            const newMembership = new Membership({
                personalInfo: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    nationality,
                    linkedin
                },
                businessInfo: {
                    companyName,
                    position,
                    industry,
                    companySize,
                    businessType,
                    primaryLocation,
                    companyWebsite,
                    companyDescription
                },
                interests: {
                    programInterests,
                    businessGoals,
                    referralSource,
                    volunteeringInterested,
                    contributionIdeas
                }
            });

            // Save to database
            const savedMembership = await newMembership.save();

            return res.status(201).json({
                success: true,
                message: "Membership created successfully!",
                data: savedMembership
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