const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3001

const url = 'mongodb://localhost:27017'
const dbname = 'Films'
const Client = new MongoClient(url, { useNewUrlParser: true})

// enable CORS Cross Origin Request, API that accepts http requests outside its domain. Makes the API public.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, ()=> console.log('Bond Fight API listening...'))