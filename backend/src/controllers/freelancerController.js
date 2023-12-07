import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";
import JobModel from "../models/Job.js";

const getFreelancers = async (req, res) => {
  try {
      const job = await JobModel.find({ jobOwnerId: req.session.userId });
      
      const jobIds = job.map(job => job._id); // iş ID'lerini alın

      // Başvuruları bulmak için tek bir sorgu yapın ve Accepted başvuruları alın
      const acceptedApplicants = await ApplicantModel.find({ job: { $in: jobIds }, status: "Accepted" });

      const responseArray = [];

      for (const applicant of acceptedApplicants) {
          const freelancer = await UserModel.findById(applicant.user); // Başvuran kullanıcıyı alın

          const responseObject = {
              firstName: freelancer?.firstName,
              lastName: freelancer?.lastName,
              skills: freelancer?.skills,
          };

          responseArray.push(responseObject);
      }

      res.status(200).json(responseArray);
  } catch (err) {
      console.error("Hata mesajı:", err.message);
      res.status(500).json({ message: "Servis hatası" });
  }
};

  
/*   
  const details = async (req, res) => {
    try {
      console.log(req.params.id + " detailsss");
  
      const applicants = await ApplicantModel.find({ job: req.params.id });
  
      const usersData = [];
  
      for (let i = 0; i < applicants.length; i++) {
        const applicant = applicants[i];
        console.log("Applicant ID:", applicant.user);
  
        const user = await UserModel.findOne({ _id: applicant.user });
  
        const userData = {
          _id:applicant._id,
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email:user.email,
          offer:applicant.offer,
          status:applicant.status
        };
  
        usersData.push(userData);
      }
  
      res.status(200).json(usersData);
  
    } catch (error) {
      throw new Error('Job search error: ' + error.message);
    }
  }; */
export{getFreelancers}