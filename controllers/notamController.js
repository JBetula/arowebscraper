const NotamEntry = require('../models/notamModel')

const getNotam = async (req, res) => {
    console.log(req.query.airport)
    const airports = req.query.airport;
    // Ensure airports is an array
    const airportCodes = Array.isArray(airports) ? airports : [airports];
    const bigboy = await NotamEntry.find(
        { airport: { $in: airportCodes.map(code => new RegExp(`^${code}$`, 'i')) } }
    );
    
    console.log(bigboy)
    res.json(bigboy)
}

module.exports = { getNotam }