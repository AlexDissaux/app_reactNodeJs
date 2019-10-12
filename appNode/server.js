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

//const lists = []
let lists = [{text:'This Item is store in NodeJS Server', id:uuidv4()}]

app.get('/shopping-list', (req, res) => {
    //console.log((Object.values(lists)))
    res.json(Object.values(lists))
})

app.post('/shopping-list', async (req, res) => {
    const id = uuidv4()
    lists[id] = {
        ...req.body,
        id
    }
    const db = client.db("db");

        let collection = db.collection('login');

        let query = lists[id]
        await collection.insertOne(query);        
        
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

// This part bellow work but i want to try with async/await
/*
MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    dbo.createCollection("login", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  }); */ 

async function mongoStart (){

  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => { console.log(err); });

    try {

        const db = client.db("db");

        let collection = db.collection('login');

        let query = { text: '[FROM MONGODB] Sample ', id : uuidv4()  }
        let res = await collection.insertOne(query);        
        query = { text: '[FROM MONGODB] Second Sample ', id : uuidv4()  }
        res = await collection.insertOne(query);
       // console.log(res)

       // lists.push(await collection.findOne({ text: 'Sample (Value Store in Mongo.toArray()[DataBase !)'},{id : 1}));
       // lists.push(await collection.findOne({ text: 'Second Sample (Value Store in Mongo DataBase !)'},{id : 1}));
       lists = await collection.find().toArray();
       console.log(await collection.find().toArray())
        

    } catch (err) {

        console.log(err);
    } finally {
        // In comment because i want to use database after without call it again
        client.close();
    }
}
mongoStart()

// Testing query
/*
app.get('/mongo', (req, res) => {
   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
      });

    res.send(...req.body)
})*/


const PORT = 3002

app.listen(PORT, console.log(`listening to port ${PORT}`))





