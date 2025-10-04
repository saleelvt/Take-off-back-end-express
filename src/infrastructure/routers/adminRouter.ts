import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import upload from '@/utilities/multer/multer';
import { Router } from 'express';


export const adminRoutes = (dependencies: IAdminDependencies) => {
    const {loginAdmin,adminAddMemberShip,getMemberShip,getMemberShipById,deleteMembershipById,updateMemberShipById,adminAddMember,getMember,updateMember,deleteMember,adminAddBanner,getBanner,updateBanner,deleteBanner } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin); 
    router.route("/add-membership").post(adminAddMemberShip)
     router.route("/get-membership").get(getMemberShip); 
     router.route("/get-membershipById/:id").get(getMemberShipById); 
     router.route("/update-membershipById/:id").put(updateMemberShipById); 
     router.route("/delete-membershipById/:id").delete(deleteMembershipById);
     
     // verified member
      router.route("/add-member").post(adminAddMember)
      router.route("/get-member").get(getMember);
      router.route("/update-member/:id").put(updateMember);
      router.route("/delete-member/:id").delete(deleteMember);
     // banner
      router.route("/add-banner").post( upload.single('image'),adminAddBanner);
      router.route("/get-banner").get(getBanner);
      router.route("/update-banner/:id").put( upload.single('image'),updateBanner);
      router.route("/delete-banner/:id").delete(deleteBanner);
    return router;
};
