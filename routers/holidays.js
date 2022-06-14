const express = require("express");
const holidaysController = require("../controllers/holidaysController.js");
const router = express.Router();

router.get("/", holidaysController.getHolidays);
router.post("/", holidaysController.createHolidays);

module.exports = router;
