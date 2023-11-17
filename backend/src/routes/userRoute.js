import express from 'express'
import * as userController from '../controllers/userController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router()


router.route("/personal/register").post(userController.registerPersonelUser)
router.route("/company/register").post(userController.registerCompanyUser)

router.route("/login").post(userController.login)

router.route("/logout").get(userController.logout)

router.route("/personal/update").post(userController.personalUpdate)

router.route("/profile").get(checkAuth,userController.getProfile)

router.route("/check-session").get(userController.checkUser)

export default router   