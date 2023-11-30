import express from 'express';
import * as applicantController from '../controllers/applicantController.js'

const router= express.Router();

router.route('/').post(applicantController.addApplicant);
router.route("/delete/:id").get(applicantController.deleteApplicant)
export default router