const mongoose = require('mongoose')

const notamSchema = new mongoose.Schema({
    airport: String,
    notam: String,
    validto: {
        type: Date,
        default: Date.now
    },
    validfrom: {
        type: Date,
        default: Date.now
    }
})

notamSchema.index({ airport: 1, notam: 1 }, { unique: true })
const NotamEntry = mongoose.model('notam', notamSchema)

module.exports = NotamEntry

