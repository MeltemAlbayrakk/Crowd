import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";


const add= async(req,res)=>{
try {
     const {selectedJob,offer}= req.body;
    const userId= req.session.userId;
    const user= await UserModel.findById(userId);

   
    console.log("yazılımcı teklifi",offer,"bide iş:",selectedJob)


    const applicant = await ApplicantModel.create({
        user:userId,
        job:selectedJob,
        offer:offer,
        
    })
    
    user.applicants.push(applicant._id);
    await applicant.save();
    await user.save();
    res.status(200).json({message:'applicant successfully'})

} catch (error) {
    console.error(error);
    res.status(500).json({ error: ' Server Error' });
}
    
   
}

export{add}