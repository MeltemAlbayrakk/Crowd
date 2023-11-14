import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:false},
    subcategory:{type:String,required:false},
    budget:{type:String,required:true},
    deadline:{type:String,required:true},
    status:{type:String,required:false}



})
 


const JobModel = mongoose.model('job', JobSchema);
export default JobModel;