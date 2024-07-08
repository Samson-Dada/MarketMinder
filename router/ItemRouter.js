const express = require("express");
const itemController = require("../controller/itemController");

const router = express.Router();

router.route("/").get(itemController.getAllItem);

router.route("/").post(itemController.CreateItems);

router.route("/items-date").get(itemController.getAllItemDate);

module.exports = router;
