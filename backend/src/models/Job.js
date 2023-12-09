import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
    title:{type:String,required:false},
    description:{type:String,required:false},
    category:{type:String,required:false},
    budget:{type:String,required:false},
    deadline:{type:String,required:false},
    status:{type:Boolean,required:false},
    jobOwnerId:{type:String,required:false},
    applicants:[{ type: Schema.Types.ObjectId, ref: 'Applicant' }],
    users:[{type:String,required:false,ref:'User'}],
    date:{type:Date,default:Date.now}                                                                                                                                                                        
})
                                        


const JobModel = mongoose.model('Job', JobSchema);
export default JobModel;