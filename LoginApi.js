var express = require("express")
var app = express()
app.use(express.json())


const MongoClient = require('mongodb').MongoClient;

// connecting to the db

app.get("/getuserList",async(req,res)=>{
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/ChatApp")//url of mongodb server
    let dbConnection = await  connection.db("ChatApp");
    let documentList = await dbConnection.collection("User").find({}).toArray();
    res.setHeader('content-type', 'application/json');
    //need to convert JSON object to string response
    res.write(JSON.stringify(documentList));//invalid arg type
    res.end();
})

// checking the credentials with the registered user
app.post("/login",async function(req,res){
    var body=req["body"];
    console.log(body)

    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/ChatApp")//url of mongodb server
    let dbConnection = await  connection.db("ChatApp");
    let documentList = await dbConnection.collection("User").find({"email":body['email'],"password":body['password']}).toArray();
   console.log(documentList)
    
    if(documentList.length ==1){
        res.status(200)
        res.write("success rate")
    }
    else{
        res.status(400)
        res.write("not a proper data")
    }
    
    res.end()

})

app.listen(8080,()=>console.log("server started"));