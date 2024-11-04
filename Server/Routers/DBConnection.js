    // DBconnection.js
    const mongoose = require('mongoose');

    const DBConnection = async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/ManagerUser', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Could not connect to MongoDB', err);
            process.exit(1); // Dừng chương trình nếu kết nối không thành công
        }
    };

    module.exports = DBConnection;
