"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const controllers_1 = require("@/presentation/admin/controllers");
const multer_1 = __importDefault(require("@/utilities/multer/multer"));
const express_1 = require("express");
const adminRoutes = (dependencies) => {
    const { loginAdmin, adminAddMemberShip, getMemberShip, getMemberShipById, deleteMembershipById, updateMemberShipById, adminAddMember, getMember, updateMember, deleteMember, searchMembers, adminAddBanner, getBanner, updateBanner, deleteBanner, adminAddEvent, getEvents, updateEvent, deleteEvent, adminAddFounderProfile, getFounderProfiles, updateFounderProfile, deleteFounderProfile, getDashboard } = (0, controllers_1.adminController)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/login").post(loginAdmin);
    router.route("/add-membership").post(adminAddMemberShip);
    router.route("/get-membership").get(getMemberShip);
    router.route("/get-membershipById/:id").get(getMemberShipById);
    router.route("/update-membershipById/:id").put(updateMemberShipById);
    router.route("/delete-membershipById/:id").delete(deleteMembershipById);
    // verified member
    router.route("/add-member").post(adminAddMember);
    router.route("/get-member").get(getMember);
    router.route("/search-members").get(searchMembers);
    router.route("/update-member/:id").put(updateMember);
    router.route("/delete-member/:id").delete(deleteMember);
    // banner
    router.route("/add-banner").post(multer_1.default.single('image'), adminAddBanner);
    router.route("/get-banner").get(getBanner);
    router.route("/update-banner/:id").put(multer_1.default.single('image'), updateBanner);
    router.route("/delete-banner/:id").delete(deleteBanner);
    // events
    router.route("/add-event").post(multer_1.default.single('image'), adminAddEvent);
    router.route("/get-events").get(getEvents);
    router.route("/update-event/:id").put(multer_1.default.single('image'), updateEvent);
    router.route("/delete-event/:id").delete(deleteEvent);
    // founder profiles
    router.route("/add-founderProfile").post(multer_1.default.single('image'), adminAddFounderProfile);
    router.route("/get-founderProfiles").get(getFounderProfiles);
    router.route("/update-founderProfile/:id").put(multer_1.default.single('image'), updateFounderProfile);
    router.route("/delete-founderProfile/:id").delete(deleteFounderProfile);
    // dashboard
    router.route("/get-dashboard").get(getDashboard);
    return router;
};
exports.adminRoutes = adminRoutes;
