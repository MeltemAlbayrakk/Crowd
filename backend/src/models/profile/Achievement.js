import mongoose from 'mongoose';


const { Schema } = mongoose;

const AchievementSchema = new Schema({
    headline:{type:String,required:false},
    description:{type:String,required:false},
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }

  });

  const AchievementModel = mongoose.model('Achievement', AchievementSchema);

export default AchievementModel;