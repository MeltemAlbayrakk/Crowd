import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName:  {type:String,required:true},
  lastName: {type:String,required:true},
  birthday: {type:String, required:false},
  gender: {type:Object , required:false},
  languages:  {type:[String],required:false},
  skills: {type:[Object],required:false},
  profileDescription: {type:String, required:false},
  address:  {type:String,required:false},
  email: {type:String, required: true },
  password: { type: String, required: true },
  phone:  {type:String,required:true},
  companyName:  {type:String,required:false},
  role: {type:String},
  reset:{code:{type:String,default:null},time:{type:String,default:null}},
  isFreelancer:{type:Boolean,required:false},
  profilePhoto:{type:String,default:""},
  jobs:[{ type: Schema.Types.ObjectId, ref: 'Job' }],
  
  educations: [{type: Schema.Types.ObjectId,ref: 'Education'}],
  projects:[{ type: Schema.Types.ObjectId, ref: 'Project' }],
  experiences:[{ type: Schema.Types.ObjectId, ref: 'Experience' }],
  achievements:[{ type: Schema.Types.ObjectId, ref: 'Achievement' }]

});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel; 
