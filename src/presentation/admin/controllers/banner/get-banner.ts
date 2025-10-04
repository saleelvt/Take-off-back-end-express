import { Banner } from "@/infrastructure/database/models/bannerSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminGetBannerController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
         

            const verifiedMembers = await Banner.find()

            if(verifiedMembers.length==0){
                res.status(404).json({
                success: false,
                message:"banner not found"
              
            });
            }
               

            res.status(200).json({
                success: true,
                data: verifiedMembers,
              
            });
        } catch (error) {
            console.error("❌ Failed to fetch verified members:", error);
            next(error);
        }
    };
};