const MetarEntry = require('../models/metarModel')

const oneAirportGet = async (req, res) => {
    const airportCode = "esNu"
    const bigboy = await MetarEntry.find(
        { airport: { $regex: new RegExp(`^${airportCode}$`, 'i') } }

        )
    console.log(bigboy)
    res.json(bigboy)
}

module.exports = { AirportGet }