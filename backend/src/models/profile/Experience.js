import mongoose from 'mongoose';


const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    headline:{type:String,required:true},
    company:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:String,required:true}
  });

  const ExperienceModel = mongoose.model('experience', ExperienceSchema);

export default ExperienceModel;