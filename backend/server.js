const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();

//our database is a simple key value store, username : password
const database = [];

app.use(express.json());
app.use(cors());

const checkJWT = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
        
        const payload = jwt.verify(token, "secret");

		if (payload) {
			req.body.username = payload.username;
			next();
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
};

app.post("/api/login", async (req, res) => {
	// Check if the user exists
	// If no, return an error
	// Else query their password
	// match password hash with given password
	// if matched, generate a jwt with username as payload

	try {
		const username = req.body.username;
		const pwd = req.body.password;

		//need to see if the user exists
		let hash;

		for(user of database){
			if (user.username === username){
				hash = user.pwd;
				break;
			}
		}

		if (hash) {
			const result = bcrypt.compare(pwd, hash);

			//if the password is correct, we send a token
			if (result) {
				const token = jwt.sign(
					{
						username: username,
					},
					"secret",
					{
						expiresIn: "1h",
					}
				);

				return res.status(200).json({
					success: "ok",
					message: "User logged in!",
					token: token,
				});
			}

			res.status(401).json({
				success: "no",
				message: "Incorrect Password",
			});
		} else {
			res.status(404).json({
				success: "no",
				message: "User not found",
			});
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.post("/api/signup", async (req, res) => {
	try {
		const username = req.body.username;
		const pwd = req.body.password;

		//compute the hash
		const saltRounds = 10;
		const hash = await bcrypt.hash(pwd, saltRounds);

		//store in database
		database.push({
			username,
			pwd: hash,
		});

		//notify user
		res.status(200).json({
			success: "ok",
			message: "User signed up!",
		});

	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.put("/api/changeUsername", checkJWT, async (req, res) => {
	try{
		const newUsername = req.body.newUsername;
		const username = req.body.username;
	
		for (const user of database){
			if (user.username === username){
				user.username = newUsername;
				break;
			}
		};
	
		res.sendStatus(200);

	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
