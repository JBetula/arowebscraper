const LogbookEntry = require('../models/logbookModel');

const toplist = async (req, res) => {

    const bigboy = await LogbookEntry.aggregate(
        [{
            $addFields: {
                flightcrew:
                    { $concatArrays: ['$flightcrew', ['$cmd']] }
            }
        },
        { $unwind: '$flightcrew' }, {
            $group: {

                _id: "$flightcrew", totalTime:

                    { $sum: "$blocktimeMinutes" }
            }
        },
        {
            $sort:
                { totalTime: -1 }
        }]
    )


    for (let index = 0; index < bigboy.length; index++) {
        bigboy[index].totalTime = [Math.floor(bigboy[index].totalTime / 60), (bigboy[index].totalTime % 60)]
        bigboy[index].rank = index + 1
    }
    res.json(bigboy)
}

module.exports = { toplist, logbook, totalHours }