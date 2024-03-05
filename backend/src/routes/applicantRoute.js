import express from 'express';
import * as applicantController from '../controllers/applicantController.js'

const router= express.Router();

router.route("/").post(applicantController.addApplicant);
router.route("/getApplicant").post(applicantController.getApplicant);
router.route("/details/:id").get(applicantController.details);
router.route("/delete/:id").post(applicantController.deleteApplicant)

router.route("/setstatus/:id").post(applicantController.setActions);
export default router