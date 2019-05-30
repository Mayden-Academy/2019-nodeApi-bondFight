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

app.get('/Bond_Films', function (req, res) {
    Client.connect(function (err) {
        let db = Client.db(dbname)
        let response = {
            success: false,
            message: '',
            data: ''
        }
        try {
            getAllFilms(db, function (documents) {
            response.success = true
            response.data = documents
            res.json(response)
        })
        } catch (error){
            response.message = error
            res.json(response)
        }
    })
})

app.post('/Bond_Films', function (req, res) {
    let result = {
        success: false,
        msg: 'endpoint does not exist',
        data: []
    }
    res.json(result)
})


app.delete('/Bond_Films', function (req, res) {
    let result = {
        success: false,
        msg: 'endpoint does not exist',
        data: []
    }
    res.json(result)
})

const getAllFilms = function (db, callback) {
    var collection = db.collection('Bond_Films')
    collection.find().toArray(function (err, documents) {
        callback(documents)
    })
}

app.listen(port, ()=> console.log('The name\'s Bond..... James Bond.'))