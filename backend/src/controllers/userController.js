import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import { userRoles } from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';

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
    companyName:registerData.companyName,
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



  
  const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      
      req.session.userId = user._id
      const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: '1h',
      });

      
      return res.status(201).json({ message: 'User login successfully', token });
    } else {
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
  }
};

  const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          succeded: false,
          error: 'Logout failed',
        });
      }
      res.clearCookie('connect.sid'); 
      res.status(200).json({
        succeded: true,
        message: 'User logged out successfully',
      });
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error: 'Server error',
    });
  }
};
  
   
const getProfile = async (req,res)=>{


console.log(req.params.id,"backenddesin")
 if(req.session.userId==req.params.id) {
  const user = await UserModel.findById(req.session.userId).populate('experiences achievements projects educations');
  
  if (!user) {
    res.status(404).json({message:"profile is not found "})
  }
  
  return res.send(user);
  
 }
 else {
  const user2 = await UserModel.findById(req.params.id).populate('experiences achievements projects educations');
  return res.send(user2);

 }


   
}

  const addPersonalDetail= async (req,res)=>{

    try {

      const {firstName,lastName,birthday,gender,languages,skills,profileDescription,address} = req.body;
      if (req.session.userId) {
        const personalDetails = await UserModel.findByIdAndUpdate(req.session.userId,{

        firstName:firstName,
        lastName: lastName,
        birthday:birthday,
        gender:gender,
        languages:languages,
        skills:skills,
        profileDescription:profileDescription,
        address:address

      })
      if (personalDetails) {
        res.status(200).json({
          message: 'Personal details has been updated successfully',})
      } else {
        res.status(404).json({
          message: 'Personal details not found or not updated',
        });
    

      }

      }
      
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'İç sunucu hatası' });
    }
};


const addCompanyDetail  = async (req,res)=>{
  

  try {

    const {companyName,  firstName , lastName,companyWebsite, companyYearOfFoundation, companySector, 
      companyDescription,
      email, companyAddress, companyCountry, companyCity, companyFacebookUrl
      ,companyTwitterUrl, companyGoogleUrl,companyLinkedinUrl,
      phone
    } = req.body;

    if (req.session.userId) {
      const  companyDetails = await UserModel.findByIdAndUpdate(req.session.userId,{


        
        companyName:companyName,
        companyWebsite:companyWebsite,
        companyYearOfFoundation:companyYearOfFoundation,
        companySector:companySector,
        companyDescription:companyDescription,
        firstName:firstName,
        lastName: lastName,
        email:email,
        companyAddress:companyAddress,
        companyCountry:companyCountry,
        companyCity:companyCity,
        companyFacebookUrl:companyFacebookUrl,
        companyTwitterUrl:companyTwitterUrl,
        companyGoogleUrl:companyGoogleUrl,
        companyLinkedinUrl:companyLinkedinUrl,
        phone:phone
    

    })
    if (companyDetails) {
      res.status(200).json({
        message: 'Personal details has been updated successfully',})
    } else {
      res.status(404).json({
        message: 'Personal details not found or not updated',
      });
  

    }

    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'İç sunucu hatası' });
  }
}

const checkUser=async(req,res)=>{

const userId=req.session.userId


    if(req.session.userId){

      return res.json({loggedIn:true,userId})

    }
  else {

    return res.json({loggedIn:false})

  }

} 



const addProfilePicture = async(req,res)=>{
  try {
    //const {profilePhoto}= req.body;
    
      const  userId  = req.session.userId; 
     // Varsayalım ki kullanıcı kimliği bir önceki adımda middleware veya başka bir yerde ayarlanmıştır
    
      console.log("profil:",req.file.path)
      const newPhotoPath =(req.file.path).replace(/\\+/g, '/').replace(/(\.\.\/frontend\/public)/, '');
      console.log("yeni profil:",newPhotoPath)

    console.log("id:",userId)
      // Kullanıcıyı bul ve profil fotoğrafını güncelle
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }
    
      user.profilePhoto = newPhotoPath;
      await user.save();
    
      res.send(user)
    } catch (error) {
      
      res.status(500).json({ error: 'Bir hata oluştu' });
    }
    
}


const beFreelancer= async (req,res)=>{

  try {

    const {profession,description,speciality} = req.body;
    if (req.session.userId) {
      const becomeFreelancer = await UserModel.findByIdAndUpdate(req.session.userId,{

          profession:profession,
          description: description,
          speciality:speciality,
     

    })
    if (becomeFreelancer) {
      res.status(200).json({
        message: 'becomeFreelancer has been updated successfully',})
    } else {
      res.status(404).json({
        message: 'becomeFreelancernot found or not updated',
      });
    }

    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'İç sunucu hatası' });
  }
};
 export {registerCompanyUser,registerPersonelUser,login,logout,addPersonalDetail,getProfile,checkUser,addProfilePicture,addCompanyDetail,
  beFreelancer}