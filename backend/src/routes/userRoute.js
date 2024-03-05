import express from 'express'
import * as userController from '../controllers/userController.js';
import * as userAchievement from '../controllers/userAchievement.js';
import * as userEducation from '../controllers/userEducation.js';
import * as userProject from '../controllers/userProject.js';
import * as userExperience from '../controllers/userExperience.js';
import * as userExperienceDoc from '../controllers/userExperienceDoc.js';
import checkAuth from '../middlewares/checkAuth.js';
import multer from 'multer';
import path from 'path';
import slugify from 'slugify'
const router=express.Router()
const app = express()
app.use("/files",express.static("files"))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const uniqueSuffix = Date.now();
    const slugifiedFilename = `${slugify(originalname, { lower: true })}-${uniqueSuffix}.${extension}`;
    cb(null, slugifiedFilename);
  },
});
  const upload = multer({ storage: storage });

  


router.route("/login").post(userController.login)
router.route("/logout").get(userController.logout)
router.route("/personal/register").post(userController.registerPersonelUser)
router.route("/company/register").post(userController.registerCompanyUser)
//
router.route("/personal/update").post(userController.addPersonalDetail)
router.route("/company/update").post(userController.addCompanyDetail)
//
router.route("/personal/education").post(userEducation.addEducation)
router.route("/personal/education/:id").get(userEducation.deleteEducation)
//
router.route("/personal/project").post(userProject.addProject)
router.route("/personal/project/:id").get(userProject.deleteProject)
//
router.route("/personal/achievement").post(userAchievement.addAchievement)
router.route("/personal/achievement/:id").get(userAchievement.deleteAchievement)
//
router.route("/personal/experience").post(userExperience.addExperience)
router.route("/personal/experience/:id").get(userExperience.deleteExperience);
router.route("/personal/experience/cv").post(upload.single('file'),userExperienceDoc.cvUpload);
router.route("/personal/experience/projectDocuments").post(upload.single('file'),userExperienceDoc.projectDocumentsUpload);
router.route("/personal/experience/certificate").post(upload.single('file'),userExperienceDoc.certificateUpload);
//
router.route("/personal/beFreelancer").post(userController.beFreelancer)
router.route("/addProfilePicture").post(upload.single('profilePhoto'),userController.addProfilePicture);
//
router.route("/profile/:id").get(userController.getProfile)
router.route("/showProfile/:id").post(userController.showProfile)

router.route("/check-session").get(userController.checkUser)
export default router   
