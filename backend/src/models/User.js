import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  phone:{type:String,required:true,unique:true},  
  companyName:{type:String,required:false},
  skills:{type:String,required:false},
  profileDescription:{type:String,required:false},
  birthDay:{type:String,required:false},
  addrbirthDayess:{type:String,required:false},
  gender:{type:String,required:false},
  languages:{type:String,required:false},
  userTitle:{type:String,required:false},
  role:{type:String}

  
    
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;