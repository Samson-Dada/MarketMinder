const mongoose = require("mongoose");

const categoryPrefixes = {
	Fruit: "FR",
	Vegetable: "VG",
	Dairy: "DY",
	Meat: "MT",
	Grain: "GR",
};

const generateSKU = (category) => {
	const prefix = categoryPrefixes[category] || "UN"; //Unknown
	const uniqueSuffix = Date.now()
		.toString()
		.slice(-5);
	return `${prefix}-${uniqueSuffix}`;
};

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "An item must have a name"],
		unique: true,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "An item must have a price"],
		min: [0, "Price must be a positive number"],
	},
	category: {
		type: String,
		required: [true, "An item must have a category"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
		default: "",
	},
	stock: {
		type: Number,
		required: [true, "Stock level must be specified"],
		min: [0, "Stock level must be a positive number or zero"],
		default: 0,
	},
	SKU: {
		type: String,
		unique: true,
		trim: true,
	},
	imageUrl: {
		type: String,
		trim: true,
		default: "",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

ItemSchema.pre("save", function(next) {
	if (!this.SKU || this.isModified("category")) {
		this.SKU = generateSKU(this.category);
	}

	this.updatedAt = Date.now();
	next();
});

ItemSchema.pre("save", function(next) {
	this.updatedAt = Date.now();
	next();
});

const Item = mongoose.model("Items", ItemSchema);
module.exports = Item;
