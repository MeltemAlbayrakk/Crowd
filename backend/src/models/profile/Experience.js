import mongoose from 'mongoose';


const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    headline:{type:String,required:false},
    company:{type:String,required:false},
    description:{type:String,required:false},
    date:{type:String,required:false},
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }
  });

  const ExperienceModel = mongoose.model('Experience', ExperienceSchema);

export default ExperienceModel;