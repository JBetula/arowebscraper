const { connectDB, disconnectDB } = require('./db.js')
const {scrape} = require('./scraper/scraper.js')
const MetarEntry = require('./models/metarModel.js')
const TafEntry = require('./models/tafModel.js')
const NotamEntry = require('./models/notamModel.js')
const {oneAirportGet} = require('./controllers/metarController.js')
const {parseTextToJSON} = require('./parserNotam.js')




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
                saveNotamToDB(key,entry)
                // await collection.insertOne({ key, entry });
            }
        }
        console.log(bigboy) 
       
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

    const entry = new NotamEntry({
        airport: airport,
        notam: notam
    })

    try {
        const result = await entry.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

connectDB()
getWx()
// oneAirportGet()
