const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRouter = require("express").Router();
const connectDB = require('./DBConnection');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
  }));

// Kết nối đến MongoDB
connectDB();

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    MSSV: String,
    Password: String
});

const User = mongoose.model('Student', userSchema);

// Endpoint để xử lý đăng nhập
authRouter.post('/User/Login.html', async (req, res) => {
    const { MSSV, Password } = req.body;
    // Tìm kiếm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ MSSV, Password });
    if (user) {
        req.session.MSSV = MSSV;  
        // Nếu đăng nhập thành công, chuyển hướng đến trang index.html
        console.log("Đăng nhập thành công");
        res.redirect('/User/Index.html');
    } else {
        res.send('Không tồn tại tài khoản');
    }
});

module.exports = authRouter
