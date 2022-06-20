const express = require("express");
const holidaysController = require("../controllers/holidays.js");
const router = express.Router();

router.get("/", holidaysController.getHolidays);
router.post("/", holidaysController.createHoliday);
router.delete("/:id", holidaysController.deleteHoliday);

module.exports = router;
