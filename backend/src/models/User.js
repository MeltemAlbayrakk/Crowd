import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  email: { type: String, required: true },
  password: { type: String, required: true,trim:true},
  phone:{type:String,required:true},  
  companyName:{type:String,required:false},
  role:{type:String},
  reset:{code:{type:String,default:null},time:{type:Date,default:null}}
    
});
/*userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};*/

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