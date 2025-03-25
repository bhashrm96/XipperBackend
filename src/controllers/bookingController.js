const prisma = require("../models/prismaClient");

exports.bookHotel = async (req, res) => {
    const { userId, hotelId, checkIn, checkOut } = req.body;

    try {
        console.log("Received booking request:", req.body); 

        const booking = await prisma.booking.create({
            data: {
                userId,
                hotelId,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
            },
        });

        res.json({ message: "Hotel booked successfully", booking });
    } catch (error) {
        res.status(500).json({ error: "Error booking hotel", details: error.message });
    }


};
