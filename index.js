require('dotenv').config();

const express = require("express");

const app = express();
var port = 3000;
var db = require('./db');
const bodyParser = require('body-parser');
const shortid = require('shortid');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');

var authMiddlewares = require('./middlewares/auth.middlewares');


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.set("view engine", "pug");
app.set("views", "./views");
app.use('/users',authMiddlewares.requireAuth,userRoute);
app.use('/auth',authRoute);
app.use('/product',productRoute);

// https://expressjs.com/en/starter/basic-routing.html

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));