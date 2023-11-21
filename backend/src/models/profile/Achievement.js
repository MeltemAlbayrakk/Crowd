import mongoose from 'mongoose';


const { Schema } = mongoose;

const AchievementSchema = new Schema({
    headline:{type:String,required:true},
    description:{type:String,required:true},


  });

  const AchievementModel = mongoose.model('Achievement', AchievementSchema);

export default AchievementModel;