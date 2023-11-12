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
        role: userRoles.PERSONAL,
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

    export {registerCompanyUser,registerPersonelUser,login,logout}