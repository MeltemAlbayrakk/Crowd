import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";


const addApplicant= async(req,res)=>{
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

const details = async (req,res)=>{
    try {

        console.log(req.params.id+" detailsss")
      const applicant = await ApplicantModel.findOne({job:req.params.id});
      console.log(applicant.user+"deneme")
      
      const user=await UserModel.findOne({_id:applicant.user})

      console.log(user.firstName)
      
      
      
      if(user){
        res.status(200).json(user)
      }else {
        res.status(404).json({
          message: 'Job details not found or not updated',
        });
      }
  
      } catch (error) {
        throw new Error('Job search error: ' + error.message);
      }
  
  
  
  };
  




export{addApplicant,deleteApplicant,details}