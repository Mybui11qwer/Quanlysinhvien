//Server.js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = express.Router();
const path = require('path');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false } // Thêm cookie nếu cần thiết
}));

app.get('/User/Index.html', (req, res) => {
  if (req.session.MSSV) {
      // Nếu đã đăng nhập, render trang với MSSV từ session
      res.render('/User/Index.html', { MSSV: req.session.MSSV });
  } else {
      res.redirect('/User/Login.html');
  }
});

const authRouter = require('./Routers/Login');
//const userRouter = require('./Routers/User');
const DBConnection = require('./Routers/DBConnection');
var serverWS = require('http').createServer(app);

app.use((req, res, next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`New request \n\tTYPE: ${req.method} \n\t URL: ${fullUrl} \n\tParam: ${JSON.stringify(req.params)} \n\tBody: ${JSON.stringify(req.body)} \n\tCookies: ${JSON.stringify(req.cookies)}`)
  next();
})
//app.use(userRouter);
app.use(authRouter);

app.use(express.static(path.join(__dirname, '..', 'Client')));

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
