const express = require("express");
const app = express();

const aws = require("aws-sdk");
require("dotenv").config();

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new aws.S3({
	endpoint: spacesEndpoint,
	accessKeyId: process.env.DO_ACCESS_KEY_ID,
	secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
});

const multer = require("multer");
const multerS3 = require("multer-s3");
// Change bucket property to your Space name
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.DO_BUCKET,
		acl: "public-read",
		key: function (request, file, cb) {
			console.log(file);
			cb(null, process.env.DO_SUB_FOLDER + file.originalname);
		},
	}),
});

app.post("/upload", upload.single("image"), (req, res, next) => {
	console.log(req.file);
	return res.json({
		filename: req.file.originalname,
		msg: "Image uploaded successfullly",
	});
});

app.get("/", (req, res) => {
	return res.json({ message: "Hello world from express" });
});

app.listen(3000, () => {
	console.log("App Is running on the server at 3000");
});
