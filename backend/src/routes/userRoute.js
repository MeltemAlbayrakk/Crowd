import express from 'express'
import * as userController from '../controllers/userController.js';
import * as userAchievement from '../controllers/userAchievement.js';
import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router()


router.route("/personal/register").post(userController.registerPersonelUser)
router.route("/company/register").post(userController.registerCompanyUser)

router.route("/login").post(userController.login)
router.route("/logout").get(userController.logout)

router.route("/personal/update").post(userController.addPersonalDetail)
router.route("/personal/achievement").post(userAchievement.addAchievement)

// router.route("/profile").get(checkAuth,userController.addPersonalDetail)

router.route("/check-session").get(userController.checkUser)
router.route("/forget-password").post(userController.forgetPassword)
router.route("/reset-code-check").post(userController.resetCodeCheck)
router.route("/reset-password").post(userController.resetPassword)
//router.route("/update-password").post(userController.updatePassword)


export default router   
