var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const user = require('./endPoints/user')
require("dotenv").config({path:"./config.env"});
var app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



// Connection to Local MongoDb
mongoose.connect(process.env.URL).then(() => {
  console.log('connected to Mongo Atlas')
}).catch((err) => console.log(err));

app.use('/', user);

const port = 4000;
app.listen(port,()=>{
  console.log(`Server running at Port ${port}`);
});

module.exports = app;
