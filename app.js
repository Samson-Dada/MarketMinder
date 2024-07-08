const express = require("express");
const globalErrorHandler = require("./controller/errorController");

const devEnv = process.env.NODE_ENV;
const proEnv = process.env.NODE_ENV;

if (devEnv === "development") {
	console.log("ENV:", process.env.NODE_ENV);
}
if (proEnv === "production") {
	console.log("ENV:", process.env.NODE_ENV);
}
const app = express();

app.use(express.json());

app.use(globalErrorHandler);
module.exports = app;
