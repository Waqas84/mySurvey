const passport = require("passport");

//----------------------------------------------------------//
//       **** Authentication Routes ****                    //
//----------------------------------------------------------//
module.exports = app => {
	// app.get("/", (req, res) => {
	// 	res.send({ hi: "there" });
	// });

	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
		console.log("---------------------------------------------");
		console.log("user is logged out");
		console.log("---------------------------------------------");
	});

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/surveys");
		}
	);

	app.get("/api/current_user", (req, res) => {
		console.log(
			"--------------------Current User-------------------------"
		);
		// console.log("req.user :", req.user);
		// console.log("req.user.id :", req.user.id);
		// console.log("req.session :", req.session);
		// console.log(
		// 	"----------------------------------------------------------"
		// );
		res.send(req.user);
		
	});
};
