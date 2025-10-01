"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const adminGetProjectById_1 = require("./adminGetProjectById");
const adminLogin_1 = require("./adminLogin");
const adminAddProject_1 = require("./adminAddProject");
const getProjects_1 = require("./getProjects");
const deleteProjectById_1 = require("./deleteProjectById");
const adminController = (dependencies) => {
    return {
        loginAdmin: (0, adminLogin_1.loginAdminController)(dependencies),
        adminAddProject: (0, adminAddProject_1.adminAddProjectController)(dependencies),
        getProjects: (0, getProjects_1.adminGetProjectController)(dependencies),
        getProjectById: (0, adminGetProjectById_1.adminGetSingleProjectController)(dependencies),
        deleteProjectById: (0, deleteProjectById_1.adminDeleteProjectController)(dependencies),
    };
};
exports.adminController = adminController;
