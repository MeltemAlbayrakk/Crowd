import express from 'express';
import conn from './db.js';
import dotenv from 'dotenv'
import UserModel from './src/models/User.js'
import bcrypt from 'bcrypt'
import userRoute from './src/routes/userRoute.js';
import jobRoute from './src/routes/jobRoute.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';


dotenv.config()

const app = express()
const port = 3001

app.use(fileUpload())
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-access-token");
  res.header("Access-Control-Allow-Credentials", "true");

  res.locals.user = req.session.user;
  next();
});
app.use(fileUpload({ useTempFiles: true }));



app.use(express.json())

conn()

app.use('/user', userRoute);
app.use('/job',jobRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})