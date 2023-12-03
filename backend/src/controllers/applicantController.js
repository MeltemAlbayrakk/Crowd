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
export{addApplicant,get,deleteApplicant}