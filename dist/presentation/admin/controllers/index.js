"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const adminLogin_1 = require("./adminLogin");
const adminAddMembership_1 = require("./adminAddMembership");
const getMembership_1 = require("./getMembership");
const adminUpdateMembership_1 = require("./adminUpdateMembership");
const adminGetMembershipById_1 = require("./adminGetMembershipById");
const deleteMembershipById_1 = require("./deleteMembershipById");
const add_member_1 = require("./verfied-members/add-member");
const get_members_1 = require("./verfied-members/get-members");
const update_member_1 = require("./verfied-members/update-member");
const delete_member_1 = require("./verfied-members/delete-member");
const search_members_1 = require("./verfied-members/search-members");
const add_banner_1 = require("./banner/add-banner");
const get_banner_1 = require("./banner/get-banner");
const update_banner_1 = require("./banner/update-banner");
const delete_banner_1 = require("./banner/delete-banner");
const add_event_1 = require("./events/add-event");
const get_events_1 = require("./events/get-events");
const update_event_1 = require("./events/update-event");
const delete_event_1 = require("./events/delete-event");
const add_founderProfile_1 = require("./founder-profiles/add-founderProfile");
const get_founderProfiles_1 = require("./founder-profiles/get-founderProfiles");
const update_founderProfile_1 = require("./founder-profiles/update-founderProfile");
const delete_founderProfile_1 = require("./founder-profiles/delete-founderProfile");
const dashboard_1 = require("./dashboard");
const adminController = (dependencies) => {
    return {
        loginAdmin: (0, adminLogin_1.loginAdminController)(dependencies),
        adminAddMemberShip: (0, adminAddMembership_1.adminAddMemberShipController)(dependencies),
        getMemberShip: (0, getMembership_1.adminGetMemberShipController)(dependencies),
        getMemberShipById: (0, adminGetMembershipById_1.adminGetMembershipByIdController)(dependencies),
        deleteMembershipById: (0, deleteMembershipById_1.adminDeleteMembershipByIdController)(dependencies),
        updateMemberShipById: (0, adminUpdateMembership_1.adminUpdateMemberShipByIdController)(dependencies),
        // add verified members
        adminAddMember: (0, add_member_1.adminAddMemberController)(dependencies),
        getMember: (0, get_members_1.adminGetMemberController)(dependencies),
        updateMember: (0, update_member_1.adminEditMemberController)(dependencies),
        deleteMember: (0, delete_member_1.adminDeleteMemberController)(dependencies),
        searchMembers: (0, search_members_1.adminSearchMembersController)(dependencies),
        adminAddBanner: (0, add_banner_1.adminAddBannerController)(dependencies),
        getBanner: (0, get_banner_1.adminGetBannerController)(dependencies),
        updateBanner: (0, update_banner_1.adminEditBannerController)(dependencies),
        deleteBanner: (0, delete_banner_1.adminDeleteBannerController)(dependencies),
        // events
        adminAddEvent: (0, add_event_1.adminAddEventController)(dependencies),
        getEvents: (0, get_events_1.adminGetEventsController)(dependencies),
        updateEvent: (0, update_event_1.adminEditEventController)(dependencies),
        deleteEvent: (0, delete_event_1.adminDeleteEventController)(dependencies),
        // founder profiles
        adminAddFounderProfile: (0, add_founderProfile_1.adminAddFounderProfileController)(dependencies),
        getFounderProfiles: (0, get_founderProfiles_1.adminGetFounderProfilesController)(dependencies),
        updateFounderProfile: (0, update_founderProfile_1.adminEditFounderProfileController)(dependencies),
        deleteFounderProfile: (0, delete_founderProfile_1.adminDeleteFounderProfileController)(dependencies),
        // dashboard
        getDashboard: (0, dashboard_1.adminDashboardController)(dependencies),
    };
};
exports.adminController = adminController;
