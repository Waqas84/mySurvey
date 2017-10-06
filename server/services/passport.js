const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	});
});

//----------------------------------------------------------//
//  ****   Passport Configration & User Registration  ****  //
//----------------------------------------------------------//
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id })
			    .then(existingUser => {
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
