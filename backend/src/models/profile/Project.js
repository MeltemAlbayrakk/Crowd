import mongoose from 'mongoose';


const { Schema } = mongoose;

const ProjectSchema = new Schema({
    headline:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:String,required:true},
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }

  });

  const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;