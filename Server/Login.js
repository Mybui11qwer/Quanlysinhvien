const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb://localhost:27017/")

app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("../User/User-Anothers/Login.html")
})

app.listen("3001", ()=>{
    console.log("Server is running!!!");
})