require("dotenv").config();
const metarRoutes = require('./routes/metarRoutes.js');
// const dataRoutes = require('./routes/dataRoutes.js');
const { connectDB } = require('./db.js')

const PORT = process.env.PORT || 3000;
connectDB()
const express = require('express')
const app = express()

app.use(express.json())
app.use('/wx', metarRoutes)
// app.use('/', express.static('static'))

console.log("server started")
// entryinsert.readCSV('./downloads/input.csv')


app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`)
})