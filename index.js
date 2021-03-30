const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId

const port = 5050 || process.env.PORT


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fltsf.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

client.connect(err => {
    const collection = client.db("volunteer").collection("details");

    app.post('/addevent', (req, res) => {
      const newEvent = req.body
      collection.insertOne(newEvent)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
    })

    app.get('/events', (req, res) => {
      collection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
    })

    app.delete('/deleteEvent/:id', (req, res) => {
      const id = ObjectId(req.params.id)
      collection.findOneAndDelete({_id: id})
      then(result => {
        console.log(result)
      })
    })
    
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})