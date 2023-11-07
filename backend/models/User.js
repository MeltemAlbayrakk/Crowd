import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone:{type:String,required:true},  
  companyName:{type:String,required:false}



    
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;