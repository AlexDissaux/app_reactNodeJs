const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const { format, transports } = require('winston')
const expressWinston = require('express-winston')
const uuidv4 = require('uuid/v4')

// MongoDB

const mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://mongo:27017/test";

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(
    expressWinston.logger({
        transports: [new transports.Console()],
        format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.splat(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.stack || info.message}`)
        )
    })
)

const lists = {}

app.get('/shopping-list', (req, res) => {
    res.json(Object.values(lists))
})

app.post('/shopping-list', (req, res) => {
    const id = uuidv4()
    lists[id] = {
        ...req.body,
        id
    }
    res.json(id)
})

app.get('/shopping-list/:id', (req, res) => {
    const list = lists[req.params.id]
    list ? res.json(list) : res.status(404).end()
})

app.put('/shopping-list/:id', (req, res) => {
    const id = req.params.id
    if (!lists[id]) {
        return res.status(404).end()
    }
    lists[id] = { ...req.body, id }
    res.end()
})

app.delete('/shopping-list/:id', (req, res) => {
    const id = req.params.id
    delete lists[id]
    res.end()
})


app.get('/mongo', (req, res) => {
   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
      });

    res.send("ok")
})


const PORT = 3002

app.listen(PORT, console.log(`listening to port ${PORT}`))





