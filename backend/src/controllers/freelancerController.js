import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";
import JobModel from "../models/Job.js";

const getFreelancers = async(req,res)=>{
    try{
        const userId= req.session.userId;
        const user=await UserModel.findById(userId)
        const job=await JobModel.find({jobOwnerId:req.session.userId});
        console.log("job 0ım:",job[0].users)
        
        const responseArray = [];

            
        await Promise.all(
            job.map(async (element) => {
              const userId = element.users;
              for (let i = 0; i < userId.length; i++) {
                const userId_ = userId[i];
                const freelancer = await UserModel.findById(userId_);
                const responseObject = {
                  firstName: freelancer?.firstName,
                  lastName: freelancer?.lastName,
                  skills: freelancer?.skills,
                };
                responseArray.push(responseObject);
                console.log(responseArray);
              }         
            })
          );

        /* for (let i = 0; i < job.length; i++) {
        
            const userId=job[i].users
            const freelancer= await UserModel.findById(userId)
            const responseObject = {
                firstName: freelancer?.firstName,
                lastName: freelancer?.lastName,
                skills:freelancer?.skills
            };

            responseArray.push(responseObject);
            console.log(responseArray)

        } */

        res.status(200).json(responseArray);

        res.status(500).json({message:"servo hata"})

    }catch(err){
        console.log("hata mesajı:",err.message)
    }

}

  
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