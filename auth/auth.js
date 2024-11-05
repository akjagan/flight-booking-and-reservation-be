const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const User = require("../models/User")
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

//create a passport middleware to handle User login
passport.use("login", new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        //Find the user associated with the email provided by the user
        const user = await User.findOne({ email });
        if (user === null) {
            //If the user isn't found in the database, return a message
            return done(null, false, { message: 'User not found' });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //if the passwords match, it returns a value of true.
        const Validate1 = await bcrypt.compare(password, user.password, function (err, result) {
            if (err) console.log(err);
            if (result) return done(null, user, { message: 'Wrong Password' });
        });
    } catch (error) {
        return done(error);
    }
}));

const JWTstartegy = require("passport-jwt").Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;

// this verifies that the token sent by the user is valid
passport.use(new JWTstartegy({
    //secret we used to sign our JWT
    secretOrKey: "top_secret",
    //we expect the user to send the token as a query parameter with the name "secret_token"
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
    