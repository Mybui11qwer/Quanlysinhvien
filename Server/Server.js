var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var router = express.Router();
var fileUpload = require('express-fileupload');
var tempFileDir = "/public/data";
var json2xls = require('json2xls');

if (process.platform == "darwin") {
  tempFileDir = "." + tempFileDir;
}

// Server your HTML file
app.use(express.static('User'));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: tempFileDir,
  limits: { fileSize: 50 * 1024 * 1024 },
  createParentPath: true,
  debug: true
}));

// Use json2xls middleware properly
app.use(json2xls.middleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./login');
const DBConnection = require('./dbConnection.js');
const IOConnection = require('./IOConnection');

var serverWS = require('http').createServer(app);

app.use((req, res, next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`New request \n\tTYPE: ${req.method} \n\t URL: ${fullUrl} \n\tParam: ${JSON.stringify(req.params)} \n\tBody: ${JSON.stringify(req.body)} \n\tCookies: ${JSON.stringify(req.cookies)}`);
  next();
});

// Ensure `authRouter` is an Express router
app.use(authRouter);

(async () => {
  await DBConnection.Init();
  var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port);
  });
  serverWS.listen(5001);
  var chatConnection = new IOConnection(serverWS);
})();
