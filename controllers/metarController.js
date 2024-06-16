const MetarEntry = require('../models/metarModel')
const TafEntry = require('../models/tafModel')


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

const getManyMetar = async (req, res) => {
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

    ]).limit(20);

    console.log(bigboy)
    res.json(bigboy)
}

const getAllAirports = async (req, res) => {
    const biggus = await MetarEntry.aggregate([
        // {
        //     // Convert _id to a date object assuming it's in ObjectId format
        //     // $addFields: {
        //         // createdAt: { $toDate: "$_id" }
        //     // }
        // },
        {
            // Sort documents by airport and createdAt in descending order
            $sort: {
                airport: 1,
                // _id:-1,
                // createdAt: -1
            }
        },
        {
            // Group by airport and get the first document in each group
            $group: {
                _id: "$airport",
                latestEntry: { $first: "$$ROOT" }
            }
        },
        {
            // Replace the root document with the latest entry
            $replaceRoot: {
                newRoot: "$latestEntry"
            }
        },
        {
            // Project only the desired fields
            $project: {
                airport: 1,
                metar: 1,
                _id: 0,
            }
        }
    ]);
    console.log(biggus)
    res.json(biggus)
}


const all = async (req, res) => {
    const biggus = await MetarEntry.aggregate([
        {
            $sort: {
                airport: 1,
                _id: -1,
            }
        },
        {
            $group: {
                _id: "$airport",
                latestEntry: { $first: "$$ROOT" }
            }
        },
        {
            $replaceRoot: {
                newRoot: "$latestEntry"
            }
        },
        {
            $project: {
                airport: 1,
                metar: 1,
                _id: 0,
            }
        },
    ]);

    const dickus = await TafEntry.aggregate([
        {
            $sort: {
                airport: 1,
                _id:-1,
            }
        },
        {
            $group: {
                _id: "$airport",
                latestEntry: { $first: "$$ROOT" }
            }
        },
        {
            $replaceRoot: {
                newRoot: "$latestEntry"
            }
        },
        {
            $project: {
                airport: 1,
                taf: 1,
                _id: 0,
            }
        },

    ]);
    // console.log(biggus[2].metar)
    const metarMap = Object.fromEntries(biggus.map(entry => [entry.airport, entry]));
    const tafMap = Object.fromEntries(dickus.map(entry => [entry.airport, entry]));

    const combinedResults = [];

    // Combine metar and taf entries based on airport
    new Set([...Object.keys(metarMap), ...Object.keys(tafMap)]).forEach(airport => {
        combinedResults.push({
            airport,
            metar: metarMap[airport] ? metarMap[airport].metar : null,
            taf: tafMap[airport] ? tafMap[airport].taf : null
        });
    });



    // console.log(combinedResults)
    res.json(combinedResults)
    }




module.exports = { getMetar, getManyMetar, getAllAirports, all }