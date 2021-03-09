var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

require('dotenv').config();

const mongoose = require('mongoose');


const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(res => {
        // console.log(res);
        console.log(`Success to Connect MongoDB Atlas, DB_NAME=${process.env.DB_NAME}`);
        return null
    })
    .catch(error => console.log(error))


app.use('/', indexRouter);

module.exports = app;