import express from 'express';
import conn from './db.js';
import dotenv from 'dotenv'
import UserModel from './src/models/User.js'
import bcrypt from 'bcrypt'
import userRoute from './src/routes/userRoute.js';
import jobRoute from './src/routes/jobRoute.js';
import applicantRoute from './src/routes/applicantRoute.js'
import session from 'express-session';
<<<<<<< HEAD
import MongoStore from 'connect-mongo'
import multer from 'multer';
import path from 'path';


=======
import MongoStore from 'connect-mongo';
import multer from 'multer';
import path from 'path';
>>>>>>> dev
dotenv.config()

const app = express()
const port = 3001



const storage = multer.diskStorage({
  destination: '../frontend/public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.use(upload.single('profilePhoto'));
<<<<<<< HEAD
//  const maxWidth = 1000; // Maksimum genişlik
//  const maxHeight = 795; // Maksimum yükseklik
=======

>>>>>>> dev




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



app.use(express.json())

conn()

app.use('/user', userRoute);
app.use('/job',jobRoute);
<<<<<<< HEAD
//app.use(express.static('../frontend/public/uploads'));
//app.use('../frontend/public/uploads',express.static('../frontend/public/uploads'));
app.use('/uploads', express.static(path.join('../frontend/public/uploads')));

=======
app.use('/applicant',applicantRoute)
app.use('/uploads',express.static('uploads'));
>>>>>>> dev

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})