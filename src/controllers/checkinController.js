const prisma = require("../models/prismaClient");

exports.webCheckIn = async (req, res) => {
    const { bookingId, familyMembers } = req.body;

    try {
        // Check if the user has already checked in
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.isCheckedIn) {
            return res.status(400).json({ error: "User has already checked in!" });
        }

        // Check for duplicate Aadhaar numbers
        for (const member of familyMembers) {
            const existingMember = await prisma.familyMember.findUnique({
                where: { aadhaar: member.aadhaar }
            });

            if (existingMember) {
                return res.status(400).json({
                    error: `Aadhaar number ${member.aadhaar} is already registered!`
                });
            }
        }

        // Insert family members' check-in details
        const familyData = familyMembers.map(member => ({
            name: member.name,
            aadhaar: member.aadhaar,
            bookingId,
        }));

        await prisma.familyMember.createMany({ data: familyData });

        // Mark the booking as checked in
        await prisma.booking.update({
            where: { id: bookingId },
            data: { isCheckedIn: true },
        });

        res.json({ message: "Web check-in successful" });
    } catch (error) {
        console.error("Error during check-in:", error);
        res.status(500).json({ error: "Error during check-in" });
    }
};

