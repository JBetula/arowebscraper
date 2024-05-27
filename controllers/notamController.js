const NotamEntry = require('../models/notamModel')

const oneAirportGet = async (req, res) => {
    const airportCode = "esNu"
    const bigboy = await NotamEntry.find(
        { airport: { $regex: new RegExp(`^${airportCode}$`, 'i') } }

        )
    console.log(bigboy)
    res.json(bigboy)
}

module.exports = { oneAirportGet }