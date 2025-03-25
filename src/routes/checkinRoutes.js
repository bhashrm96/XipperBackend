const express = require("express");
const { webCheckIn } = require("../controllers/checkinController");

const router = express.Router();

router.post("/", webCheckIn);

module.exports = router;
