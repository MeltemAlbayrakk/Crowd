import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
  title:{type:String,required:true},
  description:{type:String,required:true},
  category: { type: String,required:true },
  subCategory: { type: String},
  budget:{type:String,required:true},  
  date: { type: Date, default: Date.now },
  user:{type:Schema.Types.ObjectId,
  ref:'user'

}
        
});

const JobModel = mongoose.model('job', JobSchema);

export default JobModel;