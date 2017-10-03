const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;

const app = express();

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("accessToken is : ", accessToken);
			console.log("refreshToken is : ", refreshToken);
			console.log("User Profile : ", profile);
		}
	)
);

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});



