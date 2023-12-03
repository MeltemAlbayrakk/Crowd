import mongoose from 'mongoose';

const { Schema } = mongoose;

const EducationSchema = new Schema({
  school: { type: String, required: false },
  section: { type: String, required: false },
  date: { type: String, required: false },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
});


const EducationModel = mongoose.model('Education', EducationSchema);

export default EducationModel;