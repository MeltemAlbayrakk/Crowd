import express from 'express';
import conn from './db.js';
import dotenv from 'dotenv'
import UserModel from './src/models/User.js'
import bcrypt from 'bcrypt'
import userRoute from './src/routes/userRoute.js';


dotenv.config()

const app = express()
const port = 3001


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "http://localhost"); next; });


app.use(express.json())

conn()

app.use('/user', userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})