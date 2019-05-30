const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
var cors = require('cors')
const port = 3001
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const ObjectId = require('mongodb').ObjectId

const url = 'mongodb://localhost:27017'
const dbname = 'Films'
const Client = new MongoClient(url, { useNewUrlParser: true})

// enable CORS Cross Origin Request, API that accepts http requests outside its domain. Makes the API public.
app.use(cors())

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

app.put('/Bond_Films', jsonParser, function (req, res) {
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

const getAllFilms = function (db, callback) {
    var collection = db.collection('Bond_Films')
    collection.find().toArray(function (err, documents) {
        callback(documents)
    })
}

app.listen(port, ()=> console.log('The name\'s Bond..... James Bond.'))