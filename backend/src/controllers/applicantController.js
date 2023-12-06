import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";
import JobModel from "../models/Job.js";


const addApplicant= async(req,res)=>{
    try {
        const {selectedJob,offer}= req.body;
        const userId= req.session.userId;
        const user= await UserModel.findById(userId);
        const job = await JobModel.findById(selectedJob._id)
       
    
        


        const applicant = await ApplicantModel.create({
            user:userId,
            job:selectedJob,
            offer:offer,
            
        })
        
        user.applicants.push(applicant._id);
        job.applicants.push(applicant._id);
        await applicant.save();
        await user.save();
        await job.save();
        res.status(200).json({message:'applicant successfully'})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: ' Server Error' });
    }
    
   
}
<<<<<<< HEAD
const get = async (req,res)=>{
    try {
        const applicant = await ApplicantModel.find()
      if(applicant){
        res.status(200).json(applicant)
      }else{
        res.status(404).json("işleri alırken hata çıktı")
      }
       
      } catch (error) {
        throw new Error('Error fetching jobs: ' + error.message);
      }
    

    }
=======
const getApplicant = async(req,res)=>{
    try{
        console.log("getapplicant içindesin")
        const userId= req.session.userId;

        const user=await UserModel.findById(userId)
        // console.log("bu benim:",user)
        const responseArray = [];

        for (let i = 0; i < user.applicants.length; i++) {
            const app1 = user.applicants[i];
            const applicant = await ApplicantModel.findById(app1);
            const job = await JobModel.findById(applicant.job);

            const responseObject = {
                title: job?.title,
                category: job?.category,
                offer: applicant?.offer,
                deadline:job?.deadline,
                status:applicant?.status
            };

            responseArray.push(responseObject);
        }

        res.status(200).json(responseArray);

        res.status(500).json({message:"servo hata"})

    }catch(err){
        console.log("hata mesajı:",err.message)
    }

}
>>>>>>> 36fe13b9ef5f24c31138b17362ced551e144f12a
const deleteApplicant= async (req,res)=>{
try {
     const deletedApplicant = await ApplicantModel.findByIdAndDelete(req.params.id);
    
    const user = await UserModel.findById(req.session.userId)
    if(user){
    user.applicants = user.applicants.filter(AppId=>AppId.toString() !== req.params.id)
    await user.save();
    }

if(!deletedApplicant){
    return res.status(204).send("no data to delete was found");
}
return res.status(200).send("Applicant information deleted successfully");
} catch (error) {
    return res.status(500).send("Server error")
}
   
}
<<<<<<< HEAD
export{addApplicant,get,deleteApplicant}
=======
const setActions = async (req, res) => {
    try {
      const { status } = req.body;
      const applicant = await ApplicantModel.findByIdAndUpdate(req.params.id, { status });
      res.status(200).json({ message: "Status updated successfully", applicant });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ message: "Failed to update status" });
    }
  };
  
  
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
  };
export{addApplicant,deleteApplicant,getApplicant,details,setActions}
>>>>>>> 36fe13b9ef5f24c31138b17362ced551e144f12a
