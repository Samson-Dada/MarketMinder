const Item = require("../models/itemModel");

exports.getAllItem = async (req, res, next) => {
	const item = await Item.find();
	try {
		res.status(200).json({
			status: "success",
			totalCount: item.length,
			data: { item },
		});
	} catch (err) {
		next(err);
	}
};

exports.CreateItems = async (req, res, next) => {
	try {
		const newItem = await Item.create(req.body);
		res.status(201).json({
			status: "success",
			data: { newItem },
		});
	} catch (err) {
		next(err);
	}
};

exports.getAllItemDate = (req, res, next) => {
	const response = `price for the nee date is:${new Date()}`;

	res.status(200).json({
		status: "success",
		data: { response },
	});
};
