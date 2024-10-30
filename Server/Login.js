const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ManagerStudent')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define a User schema
const userSchema = new mongoose.Schema({
    MSSV: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Serve your HTML file
app.use(express.static('public'));

// Endpoint to handle login
app.post('/User/User-Anothers/Login.html', async (req, res) => {
    const { MSSV, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ MSSV, password });
    if (user) {
        res.send('Login successful');
    } else {
        res.send('Invalid credentials');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
