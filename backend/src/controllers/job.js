import JobModel from "../models/Job.js";


const add  = async (req,res)=>{
  console.log("AAAAAAAAAAAAAAAAAAAA")
    try {
      console.log("AAAAAAAAAAAAAAAAAAAA")
        const {form} = req.body;
        const job = await new JobModel({
        title: form.title,
        description: form.description,
        budget:form.budget,
        deadline:form.deadline
        });
    

        await job.save();
        res.status(201).json({ message: "job created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
   
}
const get = async (req,res)=>{
    try {
        const job = await JobModel.find();
        return job;
      } catch (error) {
        throw new Error('Error fetching jobs: ' + error.message);
      }
    

}
const search = async (req,res)=>{
    //title veriyo
    try {
 
        const job = await Job.find({
          $or: [
            { title: { $regex: title, $options: 'i' } },
            { description: { $regex: title, $options: 'i' } }, 
          ],
        });
    
        return job;
      } catch (error) {
        throw new Error('Job search error: ' + error.message);
      }

}

export {add,get,search}