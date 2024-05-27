//DUMMY

const mongoose = require('mongoose')

const metarSchema = new mongoose.Schema({
    airport: String,
    metar: String
})

metarSchema.index({airport: 1, metar: 1 },  { unique: true })
const MetarEntry = mongoose.model('metar', metarSchema)

module.exports = MetarEntry;