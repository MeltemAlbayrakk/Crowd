import express from 'express'
import * as job from '../controllers/job.js'


const router= express.Router()


router.route("/").post(job.add);
router.route("/").get(job.get);
router.route("/search").post(job.search);



export default router