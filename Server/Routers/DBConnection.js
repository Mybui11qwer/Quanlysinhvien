    // DBconnection.js
    const mongoose = require('mongoose');

    const DBConnection = async () => {
        await mongoose.connect('mongodb://localhost:27017/ManagerUser')
            .then(() => console.log("Connected to MongoDB"))
            .catch((error) => console.error("MongoDB connection error:", error));
    };

    module.exports = DBConnection;
