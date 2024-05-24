var express = require("express")
var app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json())

const d = new Date();

const MongoClient = require('mongodb').MongoClient;


app.post("/storedata",async(req,res)=>{
    let body = req['body']
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/ChatApp")//url of mongodb server
    let dbConnection = await  connection.db("ChatApp");
    let data  = 
        {
            "name":body['name'],
            "message" : body['message'],
            "time" : d.getTime()
        }
    ;
    await dbConnection.collection("Messages").insertOne(data) 
    res.setHeader("content-type","application/json")
    res.write(JSON.stringify({"message":"Information inserted"}))
    res.end()
})


app.get("/getdata",async(req,res)=>{
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/ChatApp")//url of mongodb server
    let dbConnection = await  connection.db("ChatApp");
    let documentList = await dbConnection.collection("Messages").find({}).toArray();
    res.setHeader('content-type', 'application/json');
    //need to convert JSON object to string response
    res.write(JSON.stringify(documentList));//invalid arg type
    res.end();
})

app.listen(8080,()=>console.log("server started"))