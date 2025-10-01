"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const controllers_1 = require("@/presentation/admin/controllers");
const express_1 = require("express");
const multer_1 = __importDefault(require("@/utilities/multer/multer"));
const adminRoutes = (dependencies) => {
    const { loginAdmin, adminAddProject, getProjects, getProjectById, deleteProjectById } = (0, controllers_1.adminController)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/login").post(loginAdmin);
    router.route("/add-project").post(multer_1.default.fields([{ name: 'mainImg', maxCount: 1 }, { name: 'backGroundImage', maxCount: 1 }, { name: 'images', maxCount: 10 }]), adminAddProject);
    router.route("/getProjects").get(getProjects);
    router.route("/getProjectById/:id").get(getProjectById);
    router.route("/DeleteProjectByIdAdmin/:id").delete(deleteProjectById);
    return router;
};
exports.adminRoutes = adminRoutes;
