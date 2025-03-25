const prisma = require("../models/prismaClient");

exports.getHotels = async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch hotels" });
    }
};

// Get hotel details by ID

exports.getHotelById = async (req, res) => {
    const { id } = req.params;
    // console.log("Fetching hotel with ID:", id); 

    // {arsed as an integer (base 10)
    const hotelId = parseInt(id, 10);

    if (isNaN(hotelId)) {
        return res.status(400).json({ message: "Invalid hotel ID" });
    }

    try {
        const hotel = await prisma.hotel.findUnique({
            where: { id: hotelId },
        });

        if (!hotel) {
            // console.log("Hotel not found");
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json(hotel);
    } catch (error) {
        // console.error("Error fetching hotel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
