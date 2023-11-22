import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import { userRoles } from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import sendEmail from "../utils/sendEmail.js"
import moment from 'moment/moment.js';
import { createTemporaryToken,decodedTemporaryToken} from '../middlewares/authMiddleware.js';
import Response from '../utils/response.js';
 
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
      console.log(req.session.userId)

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
    // Oturumu sonlandırma işlemi
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          succeded: false,
          error: 'Logout failed',
        });
      }
      res.clearCookie('connect.sid'); // Opsiyonel: Oturum kimliğiyle ilişkili çerezin silinmesi
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


const getProfile = async (req, res) => {

  if (req.session.userId) {
    const user = await UserModel.findById(req.session.userId)


    if (!user) {
      res.status(404).json({ message: "profile is not found " })
    }

    return res.send(user);
  }
  else {
    console.log('session id empty')
  }

  //const userId = req.session.userId;
  //await UserModel.findById("6555c6cf398d0f47bcf2a304") 65546ac485bebbb16f78bbe9
  //bu halde veri geliyor 

  res.status(201).json({ message: "session id empty " })
}

const addPersonalDetail = async (req, res) => {

  try {

    const { form } = req.body;
    console.log("bu cont daki veri", form)


    const personalDetails = await UserModel.updateMany({

      firstName: form.firstName,
      lastName: form.lastName,
      birthday: form.birthday,
      gender: form.gender,
      languages: form.languages,
      skills: form.skills,
      description: form.description,
      address: form.address

    })
    if (personalDetails.nModified > 0) {
      res.status(200).json({
        message: 'Personal details has been updated successfully',
      })
    } else {
      res.status(404).json({
        message: 'Personal details not found or not updated',
      });


    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'İç sunucu hatası' });
  }
};


const checkUser = async (req, res) => {

  if (req.session.userId) {

    return res.json({ loggedIn: true })

  }
  else {

    return res.json({ loggedIn: false })

  }

}

/*const forgetPassword =async(req,res)=>{
  const{email} = req.body

  const userInfo =await UserModel.findOne({email}).select("FirstName lastName email")
if (!userInfo) return new Error("Geçersiz kullnaıcı",400)
console.log("userInfo",userInfo);
const resetCode=crypto.randomBytes(3).toString("hex")

await sendEmail({
  from:"unreact07@gmail.com",
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

}*/
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userInfo = await UserModel.findOne({ email }).select("FirstName lastName email");

    if (!userInfo) {
      throw new Error("Geçersiz kullanıcı");
    }

    console.log("userInfo", userInfo);

    const resetCode = crypto.randomBytes(3).toString("hex");

  await sendEmail({
      from: 'unreact07@gmail.com',
      to: userInfo.email,
      subject: "Şifre Sıfırlama",
      text: `Şifre sıfırlama kodunuz: ${resetCode}`,
     /* html:
  '<p>Please click on the following link to verify your email address:</p>' +
  '<a href="http://localhost:3001/verify/' +
  token +
  '">http://localhost:3001/verify/' +
  token +
    '</a>',*/
  });

    await UserModel.updateOne(
      { email },
      {
        reset: {
          code: resetCode,
          time: moment(new Date()).add(15, "minutes").format("YYYY-MM-DD HH:mm:ss"),
        },
      }
    );

    return res.status(200).json({ success: true, message: "Lütfen mail kutunuzu kontrol ediniz" });
  } catch (error) {
    console.error("Hata:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const resetCodeCheck = async (req, res) => {
  const { email, code } = req.body

  const userInfo = await UserModel.findOne({ email }).select("Id firstName  lastName  email reset")

  if (!userInfo) {
    return res.status(401).json({ message: "Geçersiz kod !" });
  }

  const dbTime = moment(userInfo.reset.time)
  const nowTime = moment(new Date())
  console.log("userInfo:", userInfo);

  const timeDiff = nowTime.diff(dbTime, "minutes"); 
  console.log("zaman Farkı:", timeDiff)

  if (timeDiff < 0 || userInfo.reset.code !== code) {
    return res.status(401).json({ message: "Geçersiz kod !" });
  }
  


  const temporaryToken = await createTemporaryToken(userInfo._id, userInfo.email);
return new Response({ temporaryToken }, "Şifre sıfırlama yapabilirsiniz.").success(res);
}
const resetPassword = async (req, res) => {
  const { password, temporaryToken } = req.body

  const decodedToken = await decodedTemporaryToken(temporaryToken)
  console.log("decodedToken: ", decodedToken)


  const hashPassword = await bcrypt.hash(password, 10)

  await UserModel.findByIdAndUpdate(
    {_id:decodedToken._id},
    {
      reset:{
        code:null,
        time:null
      },
      password: hashPassword
      
    }
    );
return new Response(decodedToken,"Şifre sıfırlama başarılı").success(res)
}


/*async function updatePassword(req, res) {
  try {
    const { email, newPassword } = req.body;

    
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    
    user.password = newPassword;

    
    await user.save();

    return res.status(200).json({ success: true, message: 'Şifre başarıyla güncellendi.' });
  } catch (error) {
    console.error('Şifre güncelleme hatası:', error);
    return res.status(500).json({ success: false, message: 'Şifre güncelleme hatası.' });
  }
}*/
export { registerCompanyUser, registerPersonelUser, login, logout, addPersonalDetail, getProfile, checkUser, forgetPassword, resetCodeCheck, resetPassword}