
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { adminAddMemberShipController } from "./adminAddMembership";
import { adminGetMemberShipController } from './getMembership';
import { adminUpdateMemberShipByIdController } from './adminUpdateMembership';
import { adminGetMembershipByIdController } from "./adminGetMembershipById";
import { adminDeleteMembershipByIdController } from "./deleteMembershipById";
import { adminAddMemberController } from "./verfied-members/add-member";
import { adminGetMemberController } from "./verfied-members/get-members";
import { adminEditMemberController } from "./verfied-members/update-member";
import { adminDeleteMemberController } from "./verfied-members/delete-member";
import { adminSearchMembersController } from "./verfied-members/search-members";
import { adminAddBannerController } from "./banner/add-banner";
import { adminGetBannerController } from "./banner/get-banner";
import { adminEditBannerController } from "./banner/update-banner";
import { adminDeleteBannerController } from "./banner/delete-banner";
import { adminAddEventController } from "./events/add-event";
import { adminGetEventsController } from "./events/get-events";
import { adminEditEventController } from "./events/update-event";
import { adminDeleteEventController } from "./events/delete-event";
import { adminAddFounderProfileController } from "./founder-profiles/add-founderProfile";
import { adminGetFounderProfilesController } from "./founder-profiles/get-founderProfiles";
import { adminEditFounderProfileController } from "./founder-profiles/update-founderProfile";
import { adminDeleteFounderProfileController } from "./founder-profiles/delete-founderProfile";



export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies),
        adminAddMemberShip: adminAddMemberShipController(dependencies),
        getMemberShip: adminGetMemberShipController(dependencies),
        getMemberShipById: adminGetMembershipByIdController(dependencies),
        deleteMembershipById: adminDeleteMembershipByIdController(dependencies),
        updateMemberShipById: adminUpdateMemberShipByIdController(dependencies),

        // add verified members
         adminAddMember: adminAddMemberController(dependencies),
         getMember: adminGetMemberController(dependencies),    
         updateMember: adminEditMemberController(dependencies),
         deleteMember: adminDeleteMemberController(dependencies),
         searchMembers: adminSearchMembersController(dependencies),


         adminAddBanner: adminAddBannerController(dependencies),
         getBanner:adminGetBannerController(dependencies),    
         updateBanner: adminEditBannerController(dependencies),
         deleteBanner: adminDeleteBannerController(dependencies),

         // events
         adminAddEvent: adminAddEventController(dependencies),
         getEvents: adminGetEventsController(dependencies),    
         updateEvent: adminEditEventController(dependencies),
         deleteEvent: adminDeleteEventController(dependencies),

         // founder profiles
         adminAddFounderProfile: adminAddFounderProfileController(dependencies),
         getFounderProfiles: adminGetFounderProfilesController(dependencies),    
         updateFounderProfile: adminEditFounderProfileController(dependencies),
         deleteFounderProfile: adminDeleteFounderProfileController(dependencies),

    };
};
