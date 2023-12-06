import express from 'express';
import * as applicantController from '../controllers/applicantController.js'

const router= express.Router();

router.route("/").post(applicantController.addApplicant);
<<<<<<< HEAD
router.route("/").get(applicantController.get);
=======
router.route("/").get(applicantController.getApplicant);
router.route("/details/:id").get(applicantController.details);
>>>>>>> 36fe13b9ef5f24c31138b17362ced551e144f12a
router.route("/delete/:id").post(applicantController.deleteApplicant)

router.route("/setstatus/:id").post(applicantController.setActions);
export default router