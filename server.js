require("dotenv").config();
const metarRoutes = require('./routes/wxRoutes.js');
const notamRoutes = require('./routes/notamRoutes.js');
// const dataRoutes = require('./routes/dataRoutes.js');
const { connectDB } = require('./db.js')

const PORT = process.env.PORT || 3000;
connectDB()
const express = require('express')
const app = express()

app.use(express.json())
app.use('/wx', metarRoutes)
// app.use('/wx', tafRoutes)
app.use('/notam', notamRoutes)
// app.use('/', express.static('static'))

console.log("server started")
// entryinsert.readCSV('./downloads/input.csv')


app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`)
})