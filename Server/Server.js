//Server.js

const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var router = express.Router();
const path = require('path');
//var fileUpload = require('express-fileupload')
//var tempFileDir = "/public/data";
var json2xls = require('json2xls');
/*
if (process.platform == "darwin") {
  tempFileDir = "." + tempFileDir
}

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : tempFileDir,
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true,
  debug: true
}));
*/
app.use(json2xls.middleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./Routers/Login');
//const userRouter = require('./Routers/User');
//const registerRouter = require('./routers/register');
//const classRouter = require('./routers/class');
//const chatRouter = require('./routers/chat');
//const uploadRouter = require('./routers/upload');
//const publicRoute = require('./routers/public')
const DBConnection = require('./Routers/DBConnection');
//const IOConnection = require('./module/IOModule/IOConnection');
//const subjectRouter = require('./routers/subject');
//const scoreRouter = require('./routers/score');
//const semesterRouter = require('./routers/semester');
//const adminRouter = require('./routers/admin')
var serverWS = require('http').createServer(app);

app.use((req, res, next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`New request \n\tTYPE: ${req.method} \n\t URL: ${fullUrl} \n\tParam: ${JSON.stringify(req.params)} \n\tBody: ${JSON.stringify(req.body)} \n\tCookies: ${JSON.stringify(req.cookies)}`)
  next();
})
//app.use(userRouter);
app.use(authRouter);
//app.use(registerRouter);
//app.use(classRouter);
//app.use(chatRouter);
//app.use(uploadRouter);
//app.use(publicRoute);
//app.use(scoreRouter);
//app.use(subjectRouter);
//app.use(semesterRouter);
//app.use(adminRouter);

app.use(express.static(path.join(__dirname, '..', 'Client')));

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
