import express from 'express';
import conn from './db.js';
import dotenv from 'dotenv'
import UserModel from './src/models/User.js'
import bcrypt from 'bcrypt'
import userRoute from './src/routes/userRoute.js';
import jobRoute from './src/routes/jobRoute.js';
import authRoute from './src/routes/authRoute.js';
import applicantRoute from './src/routes/applicantRoute.js'
import freelancerRoute from './src/routes/freelancerRoute.js'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

dotenv.config()


const app = express()
const port = 3001
app.use(cors());



app.use(session({
  secret: process.env.SECRET_TOKEN,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_URI })

}));


app.use(session({
  secret: process.env.SECRET_TOKEN,
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST ,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  res.locals.user = req.session.user;
  next();
});

app.use(express.json())

conn()


app.use('/freelancer', freelancerRoute);
app.use('/user', userRoute);
app.use('/job', jobRoute);
app.use('/applicant', applicantRoute)
app.use('/auth', authRoute)
app.use('/uploads', express.static('uploads'));
app.use("/files",express.static("files"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})