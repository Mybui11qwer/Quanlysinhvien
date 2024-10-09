const express = require("express");
const mongoose = require("mongoose");
const {Schema} = mongoose;
const app = express();
//Kết nối với database
mongoose.connect("mongodb://localhost:27017/");

//Schema

const schemaStudent = new Schema({
    
})
