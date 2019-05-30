const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3001

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const ObjectId = require('mongodb').ObjectId

const url = 'mongodb://localhost:27017'
const dbname = 'Films'
const Client = new MongoClient(url, { useNewUrlParser: true})

var updateWinner = function(db, winnerId, loserId, callback) {
    var collection = db.collection('Bond_Films')
    collection.updateOne({'_id' : winnerId},
        {$inc: {'favourite' : 1, 'appeared': 1}}, function(err, result) {
            if(result.modifiedCount) {
                updateLoser(collection, loserId, callback)
            }
        })
}

var updateLoser = function (collection, loserId, callback) {
    collection.updateOne({ "_id" : loserId },
        { $inc: { "appeared" : 1 } }, function(err, result) {
            if(result.modifiedCount) {
                callback(result.modifiedCount)
            }
        })
}

app.put('/bondFilms/', jsonParser, function (req, res) {
    Client.connect(function (err) {
        let db = Client.db(dbname)
        let loserId = ObjectId(req.body.loserId)
        let winnerId = ObjectId(req.body.winnerId)

        try {
            updateWinner(db, winnerId, loserId, function (modifiedCount) {
                if (modifiedCount) {
                    res.json({
                        success: true,
                        msg: 'successfully completed task',
                        data: []
                    })
                }
            })
        } catch (error) {
            res.json({
                success: false,
                msg: error,
                data: []
            })
        }

    })
})

app.listen(port, ()=> console.log('bond database running'))