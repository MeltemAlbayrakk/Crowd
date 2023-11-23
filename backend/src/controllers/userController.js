import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import { userRoles } from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import sendEmail from "../utils/sendEmail.js"
//import moment from 'moment/moment.js';
import { createTemporaryToken,decodedTemporaryToken} from '../middlewares/authMiddleware.js';
import Response from '../utils/response.js';
import multer from 'multer';
//import upload from multer({dest:'uploads'/})
 
const registerCompanyUser = async (req, res) => {

  try {
    const { registerData } = req.body;
    const salt = await bcrypt.genSalt(10)

    const phoneNumber = await UserModel.findOne({ phone: registerData.phone })

    const email = await UserModel.findOne({ email: registerData.email })

    const hashedPassword = await bcrypt.hash(registerData.password, salt)

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


const registerPersonelUser = async (req, res) => {

  try {
    const { registerData } = req.body;

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(registerData.password, salt)

    const phoneNumber = await UserModel.findOne({ phone: registerData.phone })

    const email = await UserModel.findOne({ email: registerData.email })

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




 if(req.session.userId) {
  const user = await UserModel.findById(req.session.userId).populate('experiences achievements projects educations');
  
  if (!user) {
    res.status(404).json({message:"profile is not found "})
  }
  
  return res.send(user);
  
 }
 else {
  console.log('session id empty')
 }


   res.status(201).json({message:"session id empty "})
}

const addPersonalDetail = async (req, res) => {

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


const checkUser = async (req, res) => {

    if(req.session.userId){

      return res.json({loggedIn:true})

    }
  else {

    return res.json({loggedIn:false})

  }

} 

/*const addProfilePicture = async(req,res)=>{

const {profilePhoto} = req.body;

}*/


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); 
    console.log("Foto dosyası")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profilePhoto' + uniqueSuffix + '.jpg'); 
    console.log("dosyayı buldu ")
  },
});
const upload = multer({ storage: storage });


const addProfilePicture = async (req, res) => {
  try {
    const { profilePhoto } = req.body;

    upload.single('profilePhoto')(req, res, async function (err) {
      if (err) {
        console.log("Yükleyemedi")
        return res.status(500).json({ error: 'Dosya yükleme hatası' });
        
      }

     
      const user = await UserModel.findByIdAndUpdate(req.session.userId,(profilePhoto=req.file.path)); 
      if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }

      return res.status(200).json({ success: true, message: 'Profil fotoğrafı başarıyla güncellendi' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};





 export {registerCompanyUser,registerPersonelUser,login,logout,addPersonalDetail,getProfile,checkUser,addProfilePicture}