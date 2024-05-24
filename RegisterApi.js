var express = require("express")
var app = express()
app.use(express.json())


const MongoClient = require('mongodb').MongoClient;



app.post("/register",async(req,res)=>{
    let body = req['body']
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/ChatApp")//url of mongodb server
    let dbConnection = await  connection.db("ChatApp");
    let data  = 
        {
            "email":body["email"],
            "password":body["password"],
            "name" : body["name"],
            "mobile":body["mobile"]
        }
    ;
    await dbConnection.collection("User").insertOne(data) 
    res.setHeader("content-type","application/json")
    res.write(JSON.stringify({"message":"success"}))
    res.end()
})


app.listen(8080,()=>console.log("server started"))