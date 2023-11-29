import mongoose from 'mongoose';
const { Schema } = mongoose;


const ApplicantSchema = new Schema({
    user:{type:String,required:false,ref:'User'},
    job:{type:String,required:false,ref:'Job'},
    JobOwnerId:{type:String,required:false},
    isAgreed:{type:Boolean,required:false},
    status:{type:String,required:false},

})

const ApplicantModel = mongoose.model('applicant',ApplicantSchema);

export default ApplicantModel;
