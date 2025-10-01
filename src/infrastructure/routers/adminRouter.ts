import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';


export const adminRoutes = (dependencies: IAdminDependencies) => {
    const { loginAdmin,adminAddMemberShip,getMemberShip,getMemberShipById,deleteMembershipById,updateMemberShipById } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin); 
    router.route("/add-membership").post(adminAddMemberShip)
     router.route("/get-membership").get(getMemberShip); 
     router.route("/get-membershipById/:id").get(getMemberShipById); 
     router.route("/update-membershipById/:id").put(updateMemberShipById); 
     router.route("/delete-membershipById/:id").delete(deleteMembershipById); 
    return router;
};
