import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";
import JobModel from "../models/Job.js";

const getFreelancers = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await UserModel.findById(userId);
    const jobs = await JobModel.find({ jobOwnerId: req.session.userId });

    
    const responseArray = [];


    for (let i = 0; i < jobs.length; i++) {
      for (let j = 0; j < jobs[i].applicants.length; j++) {
        const applicantId = jobs[i].applicants[j];
        const bas = await ApplicantModel.findById(applicantId);
       
console.log("basvurular",bas)
        if (!bas || bas.status !== "Accepted") {
         // console.log(`Applicant not found or status not accepted for ID: ${applicantId}`);
          
        }else{
           //console.log("basvuru", bas);
        }

        

        //const userIds = jobs[i].users;
       // console.log("userlar ama hangileri:",userIds)
        // await Promise.all(
        //   userIds.map(async (userId) => {
        //     const freelancer = await UserModel.findById(userId);
        //     const responseObject = {
        //       firstName: freelancer?.firstName,
        //       lastName: freelancer?.lastName,
        //       skills: freelancer?.skills,
        //     };
        //      responseArray.push(responseObject);
        //   })
        // );
      }
      
    }
   
   
   
    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export  {getFreelancers};