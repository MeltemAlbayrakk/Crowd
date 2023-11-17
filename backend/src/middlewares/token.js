const { json } = require("express");
const jwt =require("jsonwebtoken");

const createToken =async (user,res) =>{
    console.log(user);

    const payload ={
        sub:userId,
        firstName: user.firstName
    }
const token = await jwt.sign(payload,process.env.SECRET_TOKEN,{
    algorithm:'HS512',
    expiresIn: process.env.SECRET_TOKEN_EXPIRES_IN
})


    return res.status(201).json({
        success:true,
        token,
        message:"Başarılı"
    })

}

const createTemporaryToken = async (userId, email) => {
    try {
      const payload = {
        sub: userId,
        email,
      };
      const token = await jwt.sign(payload, process.env.TEMPORARY_TOKEN, {
        algorithm: 'HS512',
        expiresIn: process.env.EMPORARY_TOKEN_EXPIRES_IN,
      });
      return  token;
    } catch (error) {
      console.error('createTemporaryToken Error:', error);
      throw error;
    }
  };
  

module.exports ={
    createToken,
    createTemporaryToken

}