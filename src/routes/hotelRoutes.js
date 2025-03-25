const express = require("express");
const { getHotels, getHotelById } = require("../controllers/hotelController");

const router = express.Router();

router.get("/", getHotels); // Get all hotels
router.get("/:id", getHotelById); // Get hotel by ID

module.exports = router;
