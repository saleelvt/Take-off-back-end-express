"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDeleteEventController = void 0;
const eventSchema_1 = require("@/infrastructure/database/models/eventSchema");
const adminDeleteEventController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Event ID is required"
                });
                return;
            }
            const deletedEvent = yield eventSchema_1.EventDetails.findByIdAndDelete(id);
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
        }
        catch (error) {
            console.error("❌ Failed to delete event:", error);
            next(error);
        }
    });
};
exports.adminDeleteEventController = adminDeleteEventController;
