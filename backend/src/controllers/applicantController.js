import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";


const addApplicant= async(req,res)=>{
try {
     const {selectedJob,offer}= req.body;
    const userId= req.session.userId;
    console.log(selectedJob)
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

//buna ihtiyac yok reddetme kısmında silme işlemi yapılcak
const deleteApplicant= async (req,res)=>{
    try {
        console.log("paraa:",req.params.id)
         const deletedApplicant = await ApplicantModel.findByIdAndDelete(req.params.id);
         console.log("denemee2",deletedApplicant)

        const user = await UserModel.findById(req.session.userId)
        console.log("denemee3:")

        if(user){
        user.applicants = user.applicants.filter(AppId=>AppId.toString() !== req.params.id)
        console.log("denemee4",user.applicants)
        await user.save();
        console.log("denemee5")

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