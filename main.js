const { connectDB, disconnectDB } = require('./db.js')
const { scrape } = require('./scraper/scraper.js')
const MetarEntry = require('./models/metarModel.js')
const TafEntry = require('./models/tafModel.js')
const NotamEntry = require('./models/notamModel.js')
const { parseTextToJSON } = require('./parserNotam.js')




const getWx = async () => {
    try {
        const list = await scrape();
        list.metar.forEach(e => {
            saveMetarToDB(e.airport, e.wx)
        })
        list.taf.forEach(e => {
            saveTafToDB(e.airport, e.wx)
        })
        const bigboy = parseTextToJSON(list.notam)
        for (const key of Object.keys(bigboy)) {
            console.log(key)
            // Insert each entry corresponding to the key into the database
            for (const entry of bigboy[key]) {
                saveNotamToDB(key, entry)
                // await collection.insertOne({ key, entry });
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

async function saveTafToDB(airport, wx) {
    const entry = new TafEntry({
        airport: airport,
        taf: wx
    })
    try {
        const result = await entry.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

async function saveMetarToDB(airport, wx) {
    const entry = new MetarEntry({
        airport: airport,
        metar: wx
    })
    try {
        const result = await entry.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

async function saveNotamToDB(airport, notam) {
    const fromMatch = notam.match(/FROM: ([\d]{1,2} [A-Z]{3} [\d]{4}(?: [\d]{1,2}:[\d]{2})?)/);
    const toMatch = notam.match(/TO: ([\d]{1,2} [A-Z]{3} [\d]{4}(?: [\d]{1,2}:[\d]{2})?)(?: ([A-Z]{3}))?/);
    let fromDate
    let toDate
    if (fromMatch) {
        const fromDateString = fromMatch[1];
        fromDate = parseDate(fromDateString);
        if (toMatch !== null) {
            const toDateString = toMatch[1];
            toDate = parseDate(toDateString);
        }

    } else {
        console.error('Date strings not found', airport, notam, toMatch);
    }

    const entry = new NotamEntry({
        airport: airport,
        notam: notam,
        validfrom: fromDate,
        validto: toDate
    })

    try {
        const result = await entry.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

function parseDate(dateString) {
    console.log(dateString)
    const [day, month, year, hours, minutes] = dateString.split(/[\s:]/);
    const months = {
        JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
        JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
    };
    console.log("inside PARSEDATE", day, month, months[month], year, hours, minutes)

    let date = new Date(Date.UTC(year, months[month], day, hours, minutes));

    return date;
}

connectDB()
getWx()
