import mongoose from 'mongoose';


const { Schema } = mongoose;

const EducationSchema = new Schema({
    school: {type:String,required:true},
    section: {type:String, required:true},
    date:{type:String,required:true},

  });

  const EducationModel = mongoose.model('education', EducationSchema);

export default EducationModel;