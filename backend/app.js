import express from 'express'
import conn from './db.js'
import dotenv from 'dotenv'
import UserModel from './src/models/User.js'
import bcrypt from 'bcrypt'
import userRoute from './src/routes/userRoute.js';
import jobRoute from './src/routes/jobRoute.js';
import { checkUser } from './src/middlewares/authMiddleware.js'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express()
const port = 3000


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "http://localhost"); next; });


app.use(express.json())

conn()

app.use('/user', userRoute);
app.use("/job",jobRoute)
app.use(cookieParser());
app.use('*', checkUser);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})