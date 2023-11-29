import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
    title:{type:String,required:false},
    description:{type:String,required:false},
    category:{type:String,required:false},
    budget:{type:String,required:false},
    deadline:{type:String,required:false},
    status:{type:Boolean,required:false},

    applicants:[{ type: Schema.Types.ObjectId, ref: 'Applicant' }],


})
 


const JobModel = mongoose.model('job', JobSchema);
export default JobModel;