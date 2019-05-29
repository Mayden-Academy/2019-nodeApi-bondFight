const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3001

const url = 'mongodb://localhost:27017'
const dbname = 'Films'
const Client = new MongoClient(url, { useNewUrlParser: true})

app.put('/bondFilms/', function (req, res) {
    Client.connect(function (err) {
        let db = Client.db(dbname)
        let cardId1 = req.body.cardId1
        let cardId2 = req.body.cardId2
        updateDataInDb(db, filmObject, function (result) {
            if(result.modifiedCount){
                res.json(success: true,
                    msg: 'successfully completed task',
                    data: [])
            } else {
                res.json(success: false,
                    msg: 'whoops',
                    data: [])
            }
        })
    })
})

var updateDataInDb = function(db, filmObject, callback) {
    var collection = db.collection('Bond_Films');
    collection.updateOne({ "" : filmObject }
        , { $set: { "completed" : 1 } }, function(err, result) {
            callback(result)
        });
}

// $inc: {appeared: ammount1}