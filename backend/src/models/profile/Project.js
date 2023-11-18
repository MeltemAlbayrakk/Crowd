import mongoose from 'mongoose';


const { Schema } = mongoose;

const ProjectSchema = new Schema({
    headline:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:String,required:true},


  });

  const ProjectModel = mongoose.model('project', ProjectSchema);

export default ProjectModel;