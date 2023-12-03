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
  role: {type:String},
  isFreelancer:{type:Boolean,required:false},
  profilePhoto:{type:String,default:""},
  
  profession:{type:[Object],required:false},
  description:{type:String,required:false},
  speciality:{type:[Object],required:false},


  companyName:  {type:String,required:false},
  companyWebsite:{type:String,required:false},
  companyYearOfFoundation:{type:String,required:false},
  companySector:{type:[Object],required:false},
  companyDescription:{type:String,required:false},
  companyAddress:{type:String,required:false},
  companyCountry:{type:String,required:false},
  companyCity:{type:String,required:false},
  companyFacebookUrl:{type:String,required:false},
  companyTwitterUrl:{type:String,required:false},
  companyGoogleUrl:{type:String,required:false},
  companyLinkedinUrl:{type:String,required:false},

  applicants:[{ type: Schema.Types.ObjectId, ref: 'Applicant' }],
  jobs:[{ type: Schema.Types.ObjectId, ref: 'Job' }],
  educations: [{type: Schema.Types.ObjectId,ref: 'Education'}],
  projects:[{ type: Schema.Types.ObjectId, ref: 'Project' }],
  experiences:[{ type: Schema.Types.ObjectId, ref: 'Experience' }],
  achievements:[{ type: Schema.Types.ObjectId, ref: 'Achievement' }]

});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel; 
