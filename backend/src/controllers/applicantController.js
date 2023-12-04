import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";
import JobModel from "../models/Job.js";


const addApplicant= async(req,res)=>{
    try {
        const {selectedJob,offer}= req.body;
        const userId= req.session.userId;
        const user= await UserModel.findById(userId);
        const job = await JobModel.findById(selectedJob._id)
       
    
        console.log("yazılımcı teklifi",offer,"bide iş:",selectedJob)


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
export{addApplicant,deleteApplicant}