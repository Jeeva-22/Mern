//to connect the mongodb from nodes
const MongoClient = require('mongodb').MongoClient

//async
async function getAllData(){
    //connect the mongoserver
    //let connection = await MongoClient.connect("mongodb://localhost:27017/user")//url of mongodb server
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/user")//url of mongodb server
    //connect the database
    let dbConnection = await  connection.db("user")
    //get the documents from collection
   let documentList = await dbConnection.collection("details").find({}).toArray()
    console.log(documentList)
}

async function getAllDataWithFilter(){
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/user")//url of mongodb server
    let dbConnection = await  connection.db("user")
    let documentList = await dbConnection.collection("details").find({"email":"youeEmail@gmil.com","password":"yourpasswor"}).toArray()
    console.log(documentList)
}

async function insertMultipleData(){
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/user")//url of mongodb server
    let dbConnection = await  connection.db("user")
    let data  = [
        {
            "email":"user1@gmail.com",
            "password":"user1"
        },
        {
            "email":"user2@gmail.com",
            "password":"user2"
        },
        {
            "email":"user3@gmail.com",
            "password":"user3"
        }
    ]
    await dbConnection.collection("details").insertMany(data)
    console.log("inserted")
}

async function deleteData(){
    let connection = await MongoClient.connect("mongodb://127.0.0.1:27017/user")//url of mongodb server
    let dbConnection = await connection.db("user")
    await dbConnection.collection("details").deleteOne({"email":"user1@gmail.com"})
    console.log("deleted")
}
deleteData()
//insertMultipleData();
//getAllDataWithFilter();

//connection.connect('user');//database name
