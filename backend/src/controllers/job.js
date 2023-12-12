import JobModel from "../models/Job.js";
import UserModel from "../models/User.js";


const add= async (req,res)=>{
  try {

        console.log("bu session:",req.session.userId)
        const {title,description,budget,deadline,category,subCategory} = req.body;

        const userId= req.session.userId;
        const user= await UserModel.findById(userId);

        if (req.session.userId) {
        const addJobDetail = await JobModel.create({
        title:title,
        description:description,
        category:category,
        subcategory:subCategory,
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


import Bard from "bard-ai";

const getAlljobs = async (req, res) => {
  const jobs = await JobModel.find({});

  res.status(201).json(jobs);
};

async function ai(content) {
  let myBard = new Bard(
    "eAhK0hVHsKaV9ve1gUhUfZETdln4CdiVWF9pYPUWV8L1FBMWSxJnIjzoeHhJKIwm4cIVOQ.",
    {
      verbose: true,
      fetch: fetch,
    }
  );

  try {
    const aicontent = await myBard.ask(`${content}`);
    
    console.log(aicontent);
    return aicontent;
  } catch (error) {
console.error(error);
    throw error;
  }
}

const aiAnalysis = async (req, res) => {
  try {
    const { previousMonth, nextMonth, jobTitle } = req.body;

    console.log("önceki ay:",previousMonth)
    console.log("sonraki ay:",nextMonth)
    console.log("bu vbaslık:",jobTitle)

    const today = new Date();
    const currentMonth = today.getMonth() + 1; 
    const startMonth = currentMonth - previousMonth; 
    const endMonth = currentMonth - 1; 

    const year = today.getFullYear();

    
    const startYear = startMonth > 0 ? year : year - 1;
    const endYear = endMonth > 0 ? year : year - 1;

    const startDate = new Date(startYear, startMonth > 0 ? startMonth - 1 : 11, 1); 
    const endDate = new Date(endYear, endMonth > 0 ? endMonth - 1 : 11, 31); 
    const jobs = await JobModel.find({
      subcategory: jobTitle,
      date: { $gte: startDate, $lte: endDate }
    });

    const numberOfJobsByMonth = {};

    
    for (let i = startMonth; i <= endMonth; i++) {
      numberOfJobsByMonth[i] = jobs.filter(job => {
        const jobMonth = job.date.getMonth() + 1;
        const jobYear = job.date.getFullYear();
        return jobMonth === i && jobYear === (i === 12 ? endYear : startYear);
      }).length;
    } 


    let question = Object.values(numberOfJobsByMonth).join("\n") +
      "\nGeçmiş aylardaki " + previousMonth +
      " aylık veriye bakarak gelecek " +
      nextMonth + " ay içinde ne yönlü bir gelişme olabilir tahmin yapabilir misin?" +
      "Bu bir sitede bir programlama diline olan talep sayısıdır." +
      "Gelecek aylar içinde ay ay sayı vererek tahmin yap.Dilin adı :  " + jobTitle;

  
    const data = await ai(question);
console.log("soru : "+ question)
//console.log(jobTitle)
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ai cookie patladı" });
  }
};



export {add,get,search,deleteJob,getall,aiAnalysis}