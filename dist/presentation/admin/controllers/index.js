"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const adminLogin_1 = require("./adminLogin");
const adminAddMembership_1 = require("./adminAddMembership");
const getMembership_1 = require("./getMembership");
const adminUpdateMembership_1 = require("./adminUpdateMembership");
const adminGetMembershipById_1 = require("./adminGetMembershipById");
const deleteMembershipById_1 = require("./deleteMembershipById");
const adminController = (dependencies) => {
    return {
        loginAdmin: (0, adminLogin_1.loginAdminController)(dependencies),
        adminAddMemberShip: (0, adminAddMembership_1.adminAddMemberShipController)(dependencies),
        getMemberShip: (0, getMembership_1.adminGetMemberShipController)(dependencies),
        getMemberShipById: (0, adminGetMembershipById_1.adminGetMembershipByIdController)(dependencies),
        deleteMembershipById: (0, deleteMembershipById_1.adminDeleteMembershipByIdController)(dependencies),
        updateMemberShipById: (0, adminUpdateMembership_1.adminUpdateMemberShipByIdController)(dependencies),
    };
};
exports.adminController = adminController;
