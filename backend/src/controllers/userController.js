import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import { userRoles } from '../constants/constants.js';


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
        return res.status(401).json({
          succeeded: false,
          error: 'Şifre geçerli değil. Özel karakter, rakam ve büyük harf içermelidir. Minimum 8 karakter uzunluğunda olmalıdır.',
        });
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

   const createPersonelProfile= async (req,res)=>{

    const userId = req.cookies.userId;


try {const {skills,profileDescription,birthDay,address,gender,languages,userTitle}=req.body

     await UserModel.findByIdAndUpdate(userId,{
      skills:skills,
      profileDescription:profileDescription,
      birthDay:birthDay,
      address:address,
      gender:gender,
      languages:languages,
      userTitle:userTitle

    })
  
} catch (error) {
  res.json(err)
}

    
    
   }



    export {registerCompanyUser,registerPersonelUser,login,logout,createPersonelProfile}