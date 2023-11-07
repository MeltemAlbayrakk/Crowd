import express from 'express'
import conn from './db.js'
import dotenv from 'dotenv'
import UserModel from './models/User.js'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()
const port = 3000
app.use(express.json())

conn()


app.post("/register", async (req, res) => {
  try {
      const { email, password, phone, companyName } = req.body;
      
     const salt=await bcrypt.genSalt(10)

     const hashedPassword=await bcrypt.hash(password,salt)


      const user = new UserModel({
          email: email,
          password: hashedPassword,
          phone: phone,
          companyName: companyName
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/login",async (req,res)=>{

const {email,password}=req.body

const user =await UserModel.findOne({email:email})

if(user){

  const passwordMatch = await bcrypt.compare(password, user.password);

if(passwordMatch){

  res.status(201).json({ message: 'User login successfully' });


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
}

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})