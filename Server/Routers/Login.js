const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require("express").Router();
const connectDB = require('./DBConnection');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối đến MongoDB
connectDB();

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    MSSV: String,
    Password: String
});

const User = mongoose.model('Student', userSchema);

// Phục vụ file HTML của bạn
app.use(express.static('public'));

// Endpoint để xử lý đăng nhập
app.post('/User/User-Anothers/Login.html', async (req, res) => {
    const { MSSV, Password } = req.body;
    // Tìm kiếm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ MSSV, Password });
    if (user) {
        // Nếu đăng nhập thành công, chuyển hướng đến trang index.html
        res.redirect('/index.html');
    } else {
        res.send('Không tồn tại tài khoản');
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = authRouter
