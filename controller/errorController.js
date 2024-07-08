function copyError(err) {
	//   console.log('Error', err);
	return {
		...err,
		message: err.message,
		stack: err.stack,
		name: err.name,
		// Add other properties as needed
	};
}
// console.log("Environment:", process.env.NODE_ENV);

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
};
// Error handling middleware
module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		console.log("development");
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === "production") {
		console.log("production");
		let error = copyError(err);
		console.log("error", error);
	}
};
