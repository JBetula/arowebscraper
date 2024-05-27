//DUMMY

const mongoose = require('mongoose')

const tafSchema = new mongoose.Schema({
    airport: String,
    taf: String
})

tafSchema.index({airport: 1, taf: 1 },  { unique: true })
const TafEntry = mongoose.model('taf', tafSchema)

module.exports = TafEntry;