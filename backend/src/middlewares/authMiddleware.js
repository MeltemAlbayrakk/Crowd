import UserModel from '../models/User.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
/*const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          next();
        }
      });
    } else {
        }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      error: 'Not authorized',
    });
  }
};*/
const createToken = async (user, res) => {
  console.log(user);

  const payload = {
    sub: user._id,
    firstName: user.firstName,
  };

  const token = await jwt.sign(payload, process.env.SECRET_TOKEN, {
    algorithm: 'HS512',
    expiresIn: process.env.SECRET_TOKEN_EXPIRES_IN,
  });

  return res.status(201).json({
    success: true,
    token,
    message: "Başarılı",
  });
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log(err.message);
          return res.status(401).json({
            succeeded: false,
            error: 'Not authorized',
          });
        }
        next();
      });
    } else {
      return res.status(401).json({
        succeeded: false,
        error: 'Not authorized',
      });
    }
  } catch (error) {
    console.error('authenticateToken Error:', error.message);
    return res.status(500).json({
      succeeded: false,
      error: 'Internal Server Error',
    });
  }
};

const createTemporaryToken = async (userId, email) => {
  try {
    const payload = {
      sub: userId,
      email,
    };
    const token = await jwt.sign(payload, process.env.TEMPORARY_SECRET_TOKEN, {
      algorithm: 'HS512',
      expiresIn: process.env.TEMPORARY_EXPIRES_IN,
    });
    return "Bearer " + token;
  } catch (error) {
    console.error('createTemporaryToken Error:', error);
    throw error;
  }
};


const decodedTemporaryToken =async (temporaryToken) =>{
  const token = temporaryToken.split(" ")[1]

  let userInfo;

  await jwt.verify(token,process.env.TEMPORARY_SECRET_TOKEN,async(err,decoded)=>{
    if(err) throw new Error("Geçersiz token",401)

    userInfo =await UserModel.findById(decoded.sub).select("_id firstName,lastName email")
    
    if(!userInfo)throw new Error("Geçersiz Token",401)


  })
  return userInfo
}


export { authenticateToken, checkUser ,createToken,createTemporaryToken,decodedTemporaryToken};

