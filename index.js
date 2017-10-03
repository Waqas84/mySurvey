const express = require("express");
const User = require("./models/User");
const passport = require("./server/services/passport");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const app = express();

//----------------------------------------------------------//
//           ****    MongoDB Connection ****                //
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
//           ****    Routes Handler ****                    //
//----------------------------------------------------------//

require("./server/routes/authRoutes")(app);

//----------------------------------------------------------//
//           ****    Application Listener ****              //
//----------------------------------------------------------//

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
