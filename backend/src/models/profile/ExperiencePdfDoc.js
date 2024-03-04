import mongoose from 'mongoose';


const { Schema } = mongoose;

const ExperienceDocSchema = new Schema({
    cv: {
      type: String,
      required: false,
    },
    projectDocuments:{
        type: String,
        required: false,
    },
    certificate:{
        type: String,
        required: false,
    },
    parsedText: [{ type: String }], 
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }
  });

  const ExperienceDocModel = mongoose.model('ExperienceDoc', ExperienceDocSchema);

export default ExperienceDocModel;