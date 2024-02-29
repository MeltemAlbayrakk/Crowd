import express from 'express'
import passport from 'passport';
import session from 'express-session';
import axios from 'axios';
import UserModel from '../models/User.js'
import { userRoles } from '../constants/constants.js';
import jwt from 'jsonwebtoken'

const router = express.Router()
router.use(express.urlencoded({ extended: false }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true,
}));

router.use(passport.initialize());
router.use(passport.session());

import { LinkedinAuth } from 'passport-linkedin-api-v2';

passport.use('linkedin', new LinkedinAuth({
    clientID: '7787gti63ys60o',
    clientSecret: 'UerCC3JrJBBpPWIu',
    callbackURL: "http://localhost:3001/auth/linkedin/callback",
    scope: ["email", "profile", "openid"],
}, function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        console.log(profile);
        return done(null, profile);
    });
}));

router.use(passport.initialize())
router.get('/linkedin', passport.authenticate('linkedin'),
    function (req, res) {
        console.log(req);
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

router.get('/linkedin/callback', function (req, res, next) {
    console.log(req.query.code);
    const code = req.query.code

    // Make a POST request to exchange the authorization code for an access token
    axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
        params: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:3001/auth/linkedin/callback',
            client_id: '7787gti63ys60o',
            client_secret: 'UerCC3JrJBBpPWIu', // Your LinkedIn application's client secret
        }
    })
        .then(response => {
            // Extract the access token from the response
            const accessToken = response.data.access_token;
            console.log("*****************************");
            console.log("access token", accessToken);
            console.log("*****************************");
            // Now you can use the access token to make requests to LinkedIn's API

            // Example: Fetch user profile using the access token
            return axios.get('https://api.linkedin.com/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Connection': 'Keep-Alive',
                }
            });
        })
        .then(async profileResponse => {
            // Handle successful profile retrieval
            const userProfile = profileResponse.data;

            console.log('User Profile:', userProfile);

            const user = await UserModel.findOne({ email: userProfile.email })
            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
                    expiresIn: '1h',
                });

            } else {
                const newUser = new UserModel({
                    firstName: userProfile.given_name,
                    lastName: userProfile.family_name,
                    email: userProfile.email,
                    profilePhoto: userProfile.picture,
                    role: userRoles.PERSONAL,
                });

                await newUser.save();
            }

            // Redirect or render a success page
            res.json(userProfile);

        })
        .catch(error => {
            // Handle errors
            console.error('Error exchanging authorization code for access token:', error.response);
            res.redirect('/fail');
        });
}
);


export default router