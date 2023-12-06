import express from 'express'
import * as freelancer from '../controllers/freelancerController.js'


const router= express.Router()


router.route("/").get(freelancer.getFreelancers);


export default router