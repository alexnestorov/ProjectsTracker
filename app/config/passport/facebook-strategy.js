/* globals require */
"use strict";

const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/user-model");

const FACEBOOK_APP_ID = "689681844527052";
const FACEBOOK_APP_SECRET = "0cf13c235108aa1c9158d69914339168";

module.exports = function(passport) {
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "https://dedsec.herokuapp.com/auth/facebook/return",
        profileFields: ["id", "email", "gender", "link", "locale", "name", "displayName", "timezone", "updated_time", "verified"]
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ "facebookId": profile.id }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            }
            User.validatePassword(profile.id);
            let passInfo = User.generateHash(profile.id);
            let passHash = passInfo.passwordHash;
            let salt = passInfo.salt;
            let newUser = new User({
                facebookId: profile.id,
                username: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                password: passHash,
                email: profile.emails[0].value,
                salt,
                role: "user"
            });

            newUser.save((error) => {
                if (error) {
                    console.log(error.message);
                }
                return done(null, newUser);
            });
        });
    }
  ));
};