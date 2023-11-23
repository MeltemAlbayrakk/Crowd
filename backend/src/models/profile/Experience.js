import mongoose from 'mongoose';


const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    headline:{type:String,required:true},
    company:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:String,required:true},
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }
  });

  const ExperienceModel = mongoose.model('Experience', ExperienceSchema);

export default ExperienceModel;