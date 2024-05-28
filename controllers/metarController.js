const MetarEntry = require('../models/metarModel')

const getMetar = async (req, res) => {
    console.log(req.query.airport)
    const airports = req.query.airport;
    // Ensure airports is an array
    const airportCodes = Array.isArray(airports) ? airports : [airports];
    // const bigboy = await TafEntry.find(
    //     { airport: { $in: airportCodes.map(code => new RegExp(`^${code}$`, 'i')) } }
    // );
    const bigboy = await MetarEntry.aggregate([
        {
            $match: {
                airport: { $in: airportCodes.map(code => new RegExp(`^${code}$`, 'i')) }
            }
        },
        {
            $sort: { date: 1 } // Sort by date in descending order
        },
        {
            $group: {
                _id: "$airport", // Group by airport
                latestEntry: { $first: "$$ROOT" } // Get the first document in each group
            }
        },
        {
            $replaceRoot: { newRoot: "$latestEntry" } // Replace root with the latest entry document
        }
    ]);


    // const airportCode = "esNu"
    // const bigboy = await TafEntry.find(
    //     { airport: { $regex: new RegExp(`^${airportCode}$`, 'i') } }

    //     ).limit(1).sort({$natural:-1})
    console.log(bigboy)
    res.json(bigboy)
}

const getAllMetar = async (req, res) => {
    console.log(req.query.airport)
    const airports = req.query.airport;
    // Ensure airports is an array
    const airportCodes = Array.isArray(airports) ? airports : [airports];
    const bigboy = await MetarEntry.aggregate([
        {
            $match: {
                airport: { $in: airportCodes.map(code => new RegExp(`^${code}$`, 'i')) }
            }
        },
        {
            $sort: { _id: -1 } 
        }
      
    ]).limit(10);
    
    console.log(bigboy)
    res.json(bigboy)
}

module.exports = { getMetar, getAllMetar }