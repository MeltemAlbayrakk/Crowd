// import LinkedinAuth from 'passport-linkedin-api-v2'



// passport.serializeUser((user, done) => {
//     done(null, user);
// });
 
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

 
// passport.use('linkedin', new LinkedinAuth({
//     clientID: '77mindp4s4r5kg',
//     clientSecret: 'bwYADJBCyrEnBPeU',
//     callbackURL: "http://localhost:3000/auth/linkedin/callback",
//     scope: ["email", "profile", "openid", "r_learningdata"],
// }, function (accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
//         console.log(profile);
//         return done(null, profile);
//     });
// }));