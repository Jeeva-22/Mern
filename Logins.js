var express = require("express")
var app = express()
app.use(express.json())


const MongoClient = require('mongodb').MongoClient;

app.post("/login",async(req,res)=>{
    var body=res["body"];
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/ChatApp")//url of mongodb server
    let dbConnection = await  connection.db("ChatApp");
    
    let documentList = await dbConnection.collection("User").find({"email":"1@gmail.com","password":"user1"}).toArray();
    if(body['email']=="test@gmail.com" && body["password"] == "test"){
        res.status(200)
        res.write("success rate")
    }
    else{
        res.status(400)
        res.write("not a proper data")
    }
    res.statuscode(400)
    res.write("userpost response")
    res.end()
})

app.listen(8080,()=>console.log("server started"))