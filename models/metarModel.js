//DUMMY

const mongoose = require('mongoose')

const metarSchema = new mongoose.Schema({
    airport: String,
    metar: String
})

// logbookSchema.index({ offBlock: 1, reg: 1 }, { unique: true })
const metarEntry = mongoose.model('metar', metarSchema)

module.exports = metarEntry;