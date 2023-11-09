import express from 'express'
import * as jobController from '../controllers/jobcontroller.js';



const router=express.Router()


router.route("/create").post(jobController.createjob)
router.route("/jobs").get(jobController.getAlljobs)
router.route("/ai").post(jobController.aiAnalysis)



export default router