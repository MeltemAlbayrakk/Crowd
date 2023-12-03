import mongoose from 'mongoose';


const { Schema } = mongoose;

const ProjectSchema = new Schema({
    headline:{type:String,required:false},
    description:{type:String,required:false},
    date:{type:String,required:false},
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }

  });

  const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;