const mongoose = require("mongoose");
const priceRoute = require("./router/ItemRouter");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const localDb = process.env.DATABASE_LOCAL;

const connectDB = () => {
	try {
		mongoose.connect(localDb, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (err) {
		console.error("MongoDB connection error:", err);
	}
};

connectDB();
// mounting router middleware
app.use("/api/v1/items", priceRoute);

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Listening to server for prices on port: ${port}`);
});
