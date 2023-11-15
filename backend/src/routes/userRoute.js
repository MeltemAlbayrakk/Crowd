import express from 'express'
import * as userController from '../controllers/userController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router()


router.route("/personal/register").post(userController.registerPersonelUser)
router.route("/company/register").post(userController.registerCompanyUser)
router.route("/login").post(userController.login)
router.route("/logout").get(userController.logout)
router.route("/update/personal/profile").post(userController.createPersonelProfile)


export default router