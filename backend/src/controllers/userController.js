import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRoles } from '../constants/constants.js';

const registerCompanyUser=async (req,res)=>{

    try {
        const {firstName,lastName,email, password, phone, companyName,passwordconfirm } = req.body;
        
       const salt=await bcrypt.genSalt(10)
  
       const hashedPassword=await bcrypt.hash(password,salt)

         if(password==passwordconfirm){
           const user =await new UserModel({
            firstName:firstName,
            lastName:lastName,
            email: email,
            password: hashedPassword,
            phone: phone,
            companyName: companyName,
            role:userRoles.COMPANY

        });
         await user.save();
       res.status(201).json({ message: 'User registered successfully' });

        }
       } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   

}

const registerPersonelUser=async (req,res)=>{

    try {
        const{firstName,lastName, email, password, phone,passwordconfirm} = req.body;
        
       const salt=await bcrypt.genSalt(10)
  
       const hashedPassword=await bcrypt.hash(password,salt)

  
       if(password==passwordconfirm){
        const user = await new UserModel({
            firstName:firstName,
            lastName:lastName,
            email: email,
            password: hashedPassword,
            phone: phone,    
            role:userRoles.PERSONAL

        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
       }  
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   

}

const login=async (req,res)=>{

    const {email,password}=req.body

    const user =await UserModel.findOne({email:email})
    
    if(user){
    
      const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(passwordMatch){
    
      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      }); 

      res.status(201).json({ message: 'User login successfully',token });
        
    }else {
      return res.status(401).json({
        succeded: false,
        error: 'Paswords are not matched',
      });
    }
    
    } else {
      return res.status(401).json({
        succeded: false,
        error: 'There is no such user',
      });
    }}

    const createToken = (userId) => {
      return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
    };

    const getLogout = (req, res) => {
      res.cookie('jwt', '', {
        maxAge: 1,
      });
  
    };

    export {registerCompanyUser,registerPersonelUser,login,getLogout}
