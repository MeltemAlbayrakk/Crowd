import express from 'express'
import * as userController from '../controllers/userController.js';


const router=express.Router()


router.route("/register/individual").post(userController.registerPersonelUser)
router.route("/register/corporate").post(userController.registerCompanyUser)

router.route("/login").post(userController.login)
router.route("/logout").get(userController.logout)
router.route("/update/personal/profile/:id").post(userController.createPersonelProfile)


export default router