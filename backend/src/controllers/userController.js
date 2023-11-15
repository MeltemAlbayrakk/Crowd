import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import { userRoles } from '../constants/constants.js';
import jwt from 'jsonwebtoken';


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



  
  const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      
      req.session.userId = user._id; 
     

      const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: '1h',
      });
      res.status(201).json({ message: 'User login successfully', token });
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
    // Oturumu sonlandırma işlemi
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          succeded: false,
          error: 'Logout failed',
        });
      }
      res.clearCookie('session-id'); // Opsiyonel: Oturum kimliğiyle ilişkili çerezin silinmesi
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
  


   const getUserIdFromRequest = (req) => {
    // Eğer kullanıcı kimliği request içinde varsa, onu kullan
    if (req.user && req.user.id) {
      return req.user.id;
    }
 
    // Eğer request içinde kullanıcı kimliği yoksa, isteği gönderenin kullanıcı kimliğini kullan
    // Bu durumu kullanmanın güvenli olduğundan emin olun, genellikle bu bilgiyi kullanmaktan kaçınılmalıdır.
    if (req.headers && req.headers["user-id"]) {
      return req.headers["user-id"];
    }
  
    // Eğer yukarıdaki durumlar sağlanmazsa, null veya başka bir değer dönebilirsiniz.
    return null;
  };
   
  const getProfile = async(req,res)=>{

     
    const userId = req.session.userId;
    const user = await UserModel.findById("6554c49866b1daf0b71b069b")
   // console.log(user.firstName);
    if (!user) {
      res.status(404).json({message:"profile is not found "})
    }

    return res.send(user);





  }

   const personalUpdate= async (req,res)=>{

  try {
      
    const userId = req.session.userId;
    console.log("personal update calıstı")

      if (!userId) {
        return res.status(400).json({ message: 'Kullanıcı kimliği bulunamadı' });
      }
        console.log("personal update calıstı")
      const {
        firstName,
        lastName,
        birthDay,
        gender,
        languages,
        skills,
        profileDescription,
        address,
      } = req.body;
  
    
      await UserModel.update(
        { _id: userId },
        {
          firstName,
          lastName,
          birthDay,
          gender,
          languages,
          skills,
          profileDescription,
          address,
        }
      );
  

      const updatedUser = await UserModel.findOne(userId);
  
      res.status(200).json({
        data: {
          
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          birthDay: updatedUser.birthDay,
          gender: updatedUser.gender,
          languages: updatedUser.languages,
          skills: updatedUser.skills,
          profileDescription: updatedUser.profileDescription,
          address: updatedUser.address
     
        },
        message: 'Profil başarıyla güncellendi',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'İç sunucu hatası' });
    }
  };

   
 
    export {registerCompanyUser,registerPersonelUser,login,logout, personalUpdate,getProfile}