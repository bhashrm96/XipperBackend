const express = require("express");
const { bookHotel } = require("../controllers/bookingController");

const router = express.Router();

router.post("/", bookHotel);

module.exports = router;
