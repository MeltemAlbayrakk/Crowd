import express from 'express'
import * as job from '../controllers/job.js'


const router= express.Router()


router.route("/").post(job.add);
router.route("/").get(job.get);
router.route("/jobs").get(job.getall);
router.route("/search").post(job.search);
router.route("/delete/:id").get(job.deleteJob);



export default router