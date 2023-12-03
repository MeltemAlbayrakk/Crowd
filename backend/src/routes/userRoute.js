import express from 'express'
import * as userController from '../controllers/userController.js';
import * as userAchievement from '../controllers/userAchievement.js';
import * as userEducation from '../controllers/userEducation.js';
import * as userProject from '../controllers/userProject.js';
import * as userExperience from '../controllers/userExperience.js';
import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router()




router.route("/login").post(userController.login)
router.route("/logout").get(userController.logout)
router.route("/personal/register").post(userController.registerPersonelUser)
router.route("/company/register").post(userController.registerCompanyUser)
//
router.route("/personal/update").post(userController.addPersonalDetail)
router.route("/company/update").post(userController.addCompanyDetail)
//
router.route("/personal/education").post(userEducation.addEducation)
router.route("/personal/education/:id").get(userEducation.deleteEducation)
//
router.route("/personal/project").post(userProject.addProject)
router.route("/personal/project/:id").get(userProject.deleteProject)
//
router.route("/personal/achievement").post(userAchievement.addAchievement)
router.route("/personal/achievement/:id").get(userAchievement.deleteAchievement)
//
router.route("/personal/experience").post(userExperience.addExperience)
router.route("/personal/experience/:id").get(userExperience.deleteExperience)
//
router.route("/personal/beFreelancer").post(userController.beFreelancer)
router.route("/addProfilePicture").post(userController.addProfilePicture)
//
router.route("/profile/:id").get(userController.getProfile)

router.route("/check-session").get(userController.checkUser)

export default router   
