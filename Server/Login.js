const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = express.Router();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ManagerUser')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define a User schema
const userSchema = new mongoose.Schema({
    MSSV: String,
    Password: String
});

const User = mongoose.model('Student', userSchema);

// Endpoint to handle login
app.post('/User/User-Anothers/Login.html', async (req, res) => {
    const { MSSV, Password } = req.body;
    // Find the user in the database
    const user = await User.findOne({ MSSV, Password });
    if (user) {
        console.log('Đăng nhập thành công');
        return res.redirect('Notification.html');
    } else {
        console.log('Login failed: User not found');
        return res.send('Không tồn tại tài khoản');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = authRouter;