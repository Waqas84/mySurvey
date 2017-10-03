const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

//----------------------------------------------------------//
//  ****   Passport Configration & User Registration  ****  //
//----------------------------------------------------------//
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					console.log("--------------------------------");
					console.log("User is Exist");
					console.log("User Google ID : ", profile.id);
					console.log("--------------------------------");
					done(null, existingUser);
				} else {
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
					console.log("--------------------------------");
					console.log("User Google ID : ", profile.id);
					console.log("User is Registered");
					console.log("--------------------------------");
				}
			});
		}
	)
);
