import JobModel from "../models/Job.js";
import UserModel from "../models/User.js";


const add= async (req,res)=>{
  try {

        console.log("bu session:",req.session.userId)
        const {title,description,budget,deadline,category} = req.body;

        const userId= req.session.userId;
        const user= await UserModel.findById(userId);

console.log
        if (req.session.userId) {
        const addJobDetail = await JobModel.create({
        title:title,
        description:description,
        category:category,
        budget:budget,
        deadline:deadline,
        jobOwnerId:req.session.userId
        });

        user.jobs.push(addJobDetail._id);
        await addJobDetail.save();
        await user.save();
    if (addJobDetail) {
      res.status(200).json({
        message: 'Job details has been updated successfully',})
    } else {
      res.status(404).json({
        message: 'Job details not found or not updated',
      });
    }
    }} 
   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'İç sunucu hatası' });
  }
}
const get = async (req,res)=>{
  try {
        const job = await JobModel.find()

      if(job){
        res.status(200).json(job)
      }else{
        res.status(404).json("işleri alırken hata çıktı")
      }
       
      } catch (error) {
        throw new Error('Error fetching jobs: ' + error.message);
      }
    

}

const getall = async (req,res)=>{
  
  try {
        const job = await JobModel.find({})
      if(job){
        res.status(200).json(job)
      }else{
        res.status(404).json("işleri alırken hata çıktı")
      }
       
      } catch (error) {
        throw new Error('Error fetching jobs: ' + error.message);
      }
    

}
const search = async (req,res)=>{
  try {
    const title=req.body
    const job = await JobModel.find({title:title.title});
    console.log(job)
    if(job){
      res.status(200).json(job)
    }else {
      res.status(404).json({
        message: 'Job details not found or not updated',
      });
    }

    } catch (error) {
      throw new Error('Job search error: ' + error.message);
    }



};




const deleteJob = async (req,res)=>{
  try {
    console.log("paraa:",req.params.id)
    const deletedJob = await JobModel.findByIdAndDelete(req.params.id);
    console.log("denemee2",deletedJob)

   const user = await UserModel.findById(req.session.userId)
   console.log("denemee3:")

   if(user){
   user.jobs = user.jobs.filter(JobId=>JobId.toString() !== req.params.id)
   console.log("denemee4",user.jobs)
   await user.save();

   }
  } catch (error) {
    
  }
}

export {add,get,search,deleteJob,getall}