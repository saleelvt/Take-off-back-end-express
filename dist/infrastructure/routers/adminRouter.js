"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const controllers_1 = require("@/presentation/admin/controllers");
const express_1 = require("express");
const adminRoutes = (dependencies) => {
    const { loginAdmin, adminAddMemberShip, getMemberShip, getMemberShipById, deleteMembershipById, updateMemberShipById, adminAddMember, getMember } = (0, controllers_1.adminController)(dependencies);
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
    return router;
};
exports.adminRoutes = adminRoutes;
