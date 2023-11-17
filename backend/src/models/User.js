import mongoose from 'mongoose';
import JobSchema from './Job.js'

import EducationModel from './profile/Education.js';
import ProjectModel from './profile/Project.js';
import ExperienceModel from './profile/Experience.js';
import AchievementModel from './profile/Achievement.js';
import JobModel from './Job.js';
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName:  {type:String,required:true},
  lastName: {type:String,required:true},
  birthday: {type:String, required:false},
  gender: {type:String , required:false},
  languages:  {type:[String],required:false},
  skills: {type:[String],required:false},
  profileDescription: {type:String, required:false},
  address:  {type:String,required:false},
  email: {type:String, required: true },
  password: { type: String, required: true },
  phone:  {type:String,required:true},
  companyName:  {type:String,required:false},
  role: {type:String},
  isFreelancer:{type:Boolean,required:false},
  profilePhoto:{type:String,default:""},
  jobs:[{ type: Schema.Types.ObjectId, ref: 'job' }],



  educations:[{ type: Schema.Types.ObjectId, ref: 'education' }],
  projects:[{ type: Schema.Types.ObjectId, ref: 'project' }],
  experiences:[{ type: Schema.Types.ObjectId, ref: 'experience' }],
  achievements:[{ type: Schema.Types.ObjectId, ref: 'achievement' }]

});

const UserModel = mongoose.model('user', UserSchema);

/*const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
    phone: Joi.String().required().label("phone"),
    companyName: joi.string().required().label("companyName"),
    
	});
	return schema.validate(data);
};*/

//module.exports = { UserModel, validate };

export default UserModel;