import express from 'express'
import passport from 'passport'
import session from 'express-session'
import axios from 'axios'

const app = express()
const router = express.Router()

import { LinkedinAuth } from 'passport-linkedin-api-v2';

 
passport.use('linkedin', new LinkedinAuth({
    clientID: '77mindp4s4r5kg',
    clientSecret: 'bwYADJBCyrEnBPeU',
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: ["email", "profile", "openid", "r_learningdata"],
}, function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        console.log(profile);
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  


app.use(passport.initialize());
router.get('/linkedin', passport.authenticate('linkedin'),
    function (req, res) {
        console.log("linkedin ici")
        console.log(req);
        console.log("linkedin icinde")
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

router.get('/linkedin/callback',
    function (req, res, next) {
 console.log("callback ici")

        console.log(req.query.code);
        const code = req.query.code

        // Make a POST request to exchange the authorization code for an access token
        axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:3000/auth/linkedin/callback',
                client_id: '77mindp4s4r5kg',
                client_secret: 'bwYADJBCyrEnBPeU',// Your LinkedIn application's client secret
            }
        })
            .then(response => {
                // Extract the access token from the response
                const accessToken = response.data.access_token;
                console.log("*****************************");
                console.log(accessToken);
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
            .then(profileResponse => {
                // Handle successful profile retrieval
                const userProfile = profileResponse.data;
                console.log('User Profile:', userProfile);

                // Redirect or render a success page
                res.redirect('/');
            })
            .catch(error => {
                // Handle errors
                console.error('Error exchanging authorization code for access token:', error.response.data);
                res.redirect('/fail');
            });
    }
);
export default router
