// dbConnection.js
const mongoose = require('mongoose');

const DBConnection = {
  Init: async () => {
    if (mongoose.connection.readyState === 0) {  // Check if there’s no active connection
      try {
        await mongoose.connect('mongodb://localhost:27017/ManagerStudent', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Database connection failed:', error);
      }
    } else {
      console.log('Database is already connected.');
    }
  }
};

module.exports = DBConnection;
