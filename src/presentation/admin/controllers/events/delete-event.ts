import { EventDetails } from "@/infrastructure/database/models/eventSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminDeleteEventController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Event ID is required"
                });
                return;
            }

            const deletedEvent = await EventDetails.findByIdAndDelete(id);

            if (!deletedEvent) {
                res.status(404).json({
                    success: false,
                    message: "Event not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Event deleted successfully",
                data: deletedEvent
            });
        } catch (error) {
            console.error("❌ Failed to delete event:", error);
            next(error);
        }
    };
};
