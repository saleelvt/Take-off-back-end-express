
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { adminAddMemberShipController } from "./adminAddMembership";
import { adminGetMemberShipController } from './getMembership';
import { adminUpdateMemberShipByIdController } from './adminUpdateMembership';
import { adminGetMembershipByIdController } from "./adminGetMembershipById";
import { adminDeleteMembershipByIdController } from "./deleteMembershipById";



export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies),
        adminAddMemberShip: adminAddMemberShipController(dependencies),
        getMemberShip: adminGetMemberShipController(dependencies),
        getMemberShipById: adminGetMembershipByIdController(dependencies),
        deleteMembershipById: adminDeleteMembershipByIdController(dependencies),
        updateMemberShipById: adminUpdateMemberShipByIdController(dependencies),

    };
};
