import express from 'express';
import * as applicantController from '../controllers/applicantController.js'

const router= express.Router();

router.route('/').post(applicantController.add);

export default router