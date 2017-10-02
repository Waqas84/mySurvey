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

// app.get("/", (req, res) => {
// 	res.send({ hi: "there" });
// });

app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);

app.get("/auth/google/callback", passport.authenticate("google"));

app.listen(PORT, function() {
	console.log(
		"============================================================="
	);
	console.log(
		"Now listening on port %s! Visit localhost:%s in your browser.",
		PORT,
		PORT
	);
});

// clientID 356495130493-cuo1qgqd65qhoij8m127t766vhckhbgj.apps.googleusercontent.com

//clientSecret R0F0-mfbb_lDhFbEIEg6C62B
