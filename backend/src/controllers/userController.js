import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import { userRoles } from '../constants/constants.js';
import sendMail from '../Utils/sendMail.js';
//import user from '../models/User.js'
import crypto from "crypto";
import moment from "moment";





const registerCompanyUser=async (req,res)=>{
  
    try {
        const {registerData} = req.body;
       const salt=await bcrypt.genSalt(10)

       const phoneNumber=await UserModel.findOne({phone:registerData.phone})
  
       const email=await UserModel.findOne({email:registerData.email})

       const hashedPassword=await bcrypt.hash(registerData.password,salt)

       if (!checkPasswordValidity(registerData.password)) {
        return res.status(401).json({
          succeeded: false,
          error: 'Şifre geçerli değil. Özel karakter, rakam ve büyük harf içermelidir. Minimum 8 karakter uzunluğunda olmalıdır.',
        });
      }

       if (registerData.password !== registerData.passwordConfirmation) {
        return res.status(401).json({
          succeeded: false,
          error: 'Passwords are not matched',
        });
      }
  
      if (phoneNumber) {
        return res.status(401).json({
          succeeded: false,
          error: 'Sistemde kayıtlı telefon numarası bulunmaktadır. Farklı bir numara deneyiniz.',
        });
      }

      if (email) {
        return res.status(401).json({
          succeeded: false,
          error: 'Sistemde kayıtlı email numarası bulunmaktadır. Farklı bir email adresi deneyiniz.',
        });
      }
  
      const user = await new UserModel({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: hashedPassword,
        phone: registerData.phone,
        role: userRoles.COMPANY,
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


const registerPersonelUser=async (req,res)=>{

    try {
       const{registerData} = req.body;
       
       const salt=await bcrypt.genSalt(10)
  
       const hashedPassword=await bcrypt.hash(registerData.password,salt)
       
       const phoneNumber=await UserModel.findOne({phone:registerData.phone})
  
       const email=await UserModel.findOne({email:registerData.email})

       if (registerData.password !== registerData.passwordConfirmation) {
        return res.status(401).json({
          succeeded: false,
          error: 'Passwords are not matched',
        });
      }
  
      if (phoneNumber) {
        return res.status(401).json({
          succeeded: false,
          error: 'Sistemde kayıtlı telefon numarası bulunmaktadır. Farklı bir numara deneyiniz.',
        });
      }

      if (email) {
        return res.status(401).json({
          succeeded: false,
          error: 'Sistemde kayıtlı email numarası bulunmaktadır. Farklı bir email adresi deneyiniz.',
        });
      }

      if (!checkPasswordValidity(registerData.password)) {
        return res.status(409).send(
         'Şifre geçerli değil. Özel karakter, rakam ve büyük harf içermelidir. Minimum 8 karakter uzunluğunda olmalıdır.');
      }
  
      const user = await new UserModel({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: hashedPassword,
        phone: registerData.phone,
        role: userRoles.PERSONAL,
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  function checkPasswordValidity(password) {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const digitRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lengthValid = password.length >= 8;
  
    const hasSpecialChar = specialCharRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
  
    const isValid =
      lengthValid && hasSpecialChar && hasDigit && hasUppercase;
  
    return isValid;
  }
  

const login=async (req,res)=>{

    const {email,password}=req.body
    console.log(email);

    const user =await UserModel.findOne({email:email})
    
    if(user){
      const passwordMatch = await bcrypt.compare(password, user.password);
    
      if(passwordMatch){
        /*jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:'1h'})*/
        res.status(201).json({ message: 'User login successfully' });
        

      }else {
        return res.status(401).json({
          succeded: false,
          error: 'Passwords are not matched',
        });
      }
    
    } else {
      return res.status(401).json({
        succeded: false,
        error: 'There is no such user',
      });
    }}


   const logout = async (req,res)=> {
    req.session.destroy((err)=>{
      if(err){
        console.error("oturum sonlandırma hatası");
      }else{
        res.redirect('/homepage');
      }
    })
    res.redirect("/homepage");
   }

   
const forgetPassword =async(req,res)=>{
  const{email} = req.body

  const userInfo =await UserModel.findOne({email}).select("email")
if (!userInfo) return new Error("Geçersiz kullnaıcı",400)
console.log("userInfo",userInfo);
const resetCode=crypto.randomBytes(3).toString("hex")

await sendMail({
  from:"mervebingool@gmail.com",
  to:userInfo.email,
  subject: "şifre sıfırlama",
  text: `Şifre sıfırlama kodunuz ${resetCode}`
})

await UserModel.updateOne(
  {email},
  {
    reset:{
      code:resetCode,
      time:moment(new Date()).add(15,"minute").format("YYYY-MM-DD HH:mm:ss")
    }
  }
)
return new Response(true," Lütfen mail kutunuzu kontrol ediniz").success(res)

}
const resetCodeCheck = async(req,res)=> {
  const {email,code} =req.body

  const userInfo = await UserModel.findOne({email}).select("Id firstName  lastName  email reset")

  if(!userInfo) throw new Error("Gçersiz kod ! ",401)

  const dbTime= moment(userInfo.reset.time)
  const nowTime = moment(new Date())

  const timeDiff= dbTime.diff(nowTime,"minutes")
console.log("zaman Farkı:",timeDiff)

if(timeDiff <= 0 || !userInfo.reset.code === code){
  throw new Error("Geçersiz kod ",401)
}


const temporaryToken = await createTemporaryToken(userInfo.id,userInfo.email)

return new Response(temporaryToken,"şifre sıfırlama yapabilrisiniz.").success(res)
}
const resetPassword =async(req,res) => {
}
    export {registerCompanyUser,registerPersonelUser,login,logout,forgetPassword,resetCodeCheck}