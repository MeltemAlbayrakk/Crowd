import mongoose from 'mongoose';

const { Schema } = mongoose;

const EducationSchema = new Schema({
  school: { type: String, required: true },
  section: { type: String, required: true },
  date: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
});


const EducationModel = mongoose.model('Education', EducationSchema);

export default EducationModel;