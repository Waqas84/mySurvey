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