const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const User = require("./models/User");
const passport = require("passport");
require("./server/services/passport");
const keys = require("./config/keys");

const PORT = process.env.PORT || 5000;
const app = express();

//----------------------------------------------------------//
//           **** Middleware ****                           //
//----------------------------------------------------------//

//Setup cookie's maximum age
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

// Telling passport to use Cookie to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------------------------//
//           **** MongoDB Connection ****                   //
//----------------------------------------------------------//

const db = process.env.MONGODB_URI || "mongodb://localhost/mySurvey";
mongoose.connect(db, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.log("Mongoose Connection Is Successful");
	}
});

//----------------------------------------------------------//
//           **** Routes Handler ****                       //
//----------------------------------------------------------//

require("./server/routes/authRoutes")(app);

//----------------------------------------------------------//
//           **** Application Listener ****                 //
//----------------------------------------------------------//

app.listen(PORT, function() {
	console.log(
		"============================================================="
	);
	console.log(
		"Server is listening on port %s! Visit localhost:%s in your browser.",
		PORT,
		PORT
	);
});
