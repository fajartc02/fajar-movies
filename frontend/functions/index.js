const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
const indexRouter = require('./routes/index');

const app = require("express")();
app.use(cors())

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(res => {
        // console.log(res);
        console.log(`Success to Connect MongoDB Atlas, DB_NAME=${process.env.DB_NAME}`);
        return null
    })
    .catch(error => console.log(error))
app.use('/', indexRouter);

exports.movies = functions.https.onRequest(app)