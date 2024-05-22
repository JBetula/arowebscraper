//DUMMY

const mongoose = require('mongoose')

const tafSchema = new mongoose.Schema({
    airport: String,
    taf: String
})

// logbookSchema.index({ offBlock: 1, reg: 1 }, { unique: true })
const tafEntry = mongoose.model('taf', tafSchema)

module.exports = tafEntry;