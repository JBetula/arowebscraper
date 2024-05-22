const mongoose = require('mongoose');
// const {debugDB} = require('./debug.js')

const connectDB = async () => {
    try {
        console.log("bvgsdfasfd")
        // await mongoose.connect('mongodb://wxboydb:27017/wxboydb', {
        await mongoose.connect('mongodb://localhost:27018/wxboydb', {
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        // debugDB('MongoDB Disconnected');
    } catch (error) {
        // debugDB('Error disconnecting from MongoDB:', error);
    }
};
module.exports = { connectDB, disconnectDB };