// server/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectDB;
