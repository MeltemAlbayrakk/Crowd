import express from 'express';
import * as applicantController from '../controllers/applicantController.js'

const router= express.Router();

router.route("/").post(applicantController.addApplicant);
router.route("/").get(applicantController.getApplicant);

router.route("/delete/:id").post(applicantController.deleteApplicant)

export default router