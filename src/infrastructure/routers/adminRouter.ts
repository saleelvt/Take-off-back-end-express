import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import upload from '@/utilities/multer/multer';
import { Router } from 'express';


export const adminRoutes = (dependencies: IAdminDependencies) => {
    const {loginAdmin,adminAddMemberShip,getMemberShip,getMemberShipById,deleteMembershipById,updateMemberShipById,adminAddMember,getMember,updateMember,deleteMember,searchMembers,adminAddBanner,getBanner,updateBanner,deleteBanner,adminAddEvent,getEvents,updateEvent,deleteEvent,adminAddFounderProfile,getFounderProfiles,updateFounderProfile,deleteFounderProfile } = adminController(dependencies);
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
      router.route("/search-members").get(searchMembers);
      router.route("/update-member/:id").put(updateMember);
      router.route("/delete-member/:id").delete(deleteMember);
     // banner
      router.route("/add-banner").post( upload.single('image'),adminAddBanner);
      router.route("/get-banner").get(getBanner);
      router.route("/update-banner/:id").put( upload.single('image'),updateBanner);
      router.route("/delete-banner/:id").delete(deleteBanner);
     // events
      router.route("/add-event").post( upload.single('image'),adminAddEvent);
      router.route("/get-events").get(getEvents);
      router.route("/update-event/:id").put( upload.single('image'),updateEvent);
      router.route("/delete-event/:id").delete(deleteEvent);
     // founder profiles
      router.route("/add-founderProfile").post( upload.single('image'),adminAddFounderProfile);
      router.route("/get-founderProfiles").get(getFounderProfiles);
      router.route("/update-founderProfile/:id").put( upload.single('image'),updateFounderProfile);
      router.route("/delete-founderProfile/:id").delete(deleteFounderProfile);
    return router;
};
