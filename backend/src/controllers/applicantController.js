import UserModel from "../models/User.js";
import ApplicantModel from "../models/applicant.js";
import JobModel from "../models/Job.js";

const addApplicant= async(req,res)=>{
    try {
        const {selectedJob,offer}= req.body;
        const userId= req.session.userId;
        //const user= await UserModel.findById(userId);

    console.log("addaplicant userid : "+ userId)
        //console.log("yazılımcı teklifi "+offer,"bide iş: "+ selectedJob)


        const applicant = await ApplicantModel.create({
            user:userId,
            job:selectedJob,
            offer:offer,
            
        })


        res.status(201).json({
          message: 'applicant has been added successfully',
        });
        //await applicant.save();
        const user = await UserModel.findById(userId);

        await user.applicants.push(applicant._id);


        await user.save();

        const job=await JobModel.findById(applicant.job)
        await job.applicants.push(applicant._id);
        await job.save();



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
        offer:applicant.offer
      };

      usersData.push(userData);
    }

    res.status(200).json(usersData);

  } catch (error) {
    throw new Error('Job search error: ' + error.message);
  }
};



  


export{addApplicant,deleteApplicant,details,setActions}