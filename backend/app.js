//In this file we will create an express app

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

const app = express();   //it creates the express app
mongoose.connect("mongodb+srv://VPJ:CV8Q4GsetIkQSsl8@cluster0.o0bjd.mongodb.net/myDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to database!");
    }).catch(() => {
        console.log("Connection to database failed!");
    });

//Middelware to parse the body of incoming requests containing json data
app.use(bodyParser.json());

//This middleware Sets the headers to allow CORS policy (CORS-Cross Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT, PATCH, OPTIONS"
    );
    next();
})

app.use("/api/posts/",postsRoutes);

module.exports = app;

