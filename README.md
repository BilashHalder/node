Database, Collection, Document (A document is a set of key-value pairs.)
Advantages of MongoDB over RDBMS: Schema less No complex joins Tuning Ease of scale-out.
Data Model Design: MongoDB provides two types of data models: embedded data model and normalized data model.
Embedded Data Model:
{ _id: , 
Uniq_ID: "10025AE336" 
Info Title 1: {attribute 1: "value", attribute 2: "value”… attribute n : "value" }, 
Info Title 2: { attribute 1: "value", attribute 2: "value”… attribute n : "value"}, 
Info Title N: { attribute 1: "value", attribute 2: "value”… attribute n : "value"} 
}
Normalized data model:
The sub documents in the original document, using references. 
For each information sub document is used.

Useful Commands:
use DATABASE_NAME is used to create database. 
show dbs check list of databases 
db.collectionName.insert({“attribute”:”value”,” attribute”:”value”})
db.COLLECTION_NAME.insertOne({js Object});
db.COLLECTION_NAME.insertMany([{js Object},{js Object},{js Obect}]);array of js object
db. COLLECTION_NAME.find() find all result from collection also
db. COLLECTION_NAME.find(condition)
Condition like:
{key:value}
db. COLLECTION_NAME.findOne();

Clause condition also can be used example AND, OR, >.<.<=,>=,!=,IN Not In
Example:
Db.collectionName.find({$(and,or,nor)
});
db.collectioName.find({$operator:[lsit of attribute with value]
});
db.dropDatabase() command is used to drop a existing database (selected db).
db.createCollection(CollectionName, options) 
options are used define the info about the collection :
capped : true, autoIndexID : true, size :diskSpaceInBytes, max : No of max record hold the transaction.
show collections show all collections existence db.
 db.COLLECTION_NAME.drop() is used to drop collection from db.
db.COLLECTION_NAME.update(SELECTION_CRITERIA, UPDATED_DATA)
db.CollectionName.save({_id:ObjectId(),NEW_DATA}) method replaces the existing document with the new document passed in the save() method.
db.COLLECTION_NAME.findOneAndUpdate(SELECTIOIN_CRITERIA, UPDATED_DATA)
db.COLLECTION_NAME.update(<filter>, <update>)
db.COLLECTION_NAME.remove(DELLETION_CRITTERIA)

find().Limit / sort

db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)



Datatypes 
String Integer Boolean Double Min/ Max keys Arrays Timestamp Object Null Symbol Date Object ID Binary data Code Regular expression.
 
MongoDB and Node Js:
var MongoClient = require('mongodb').MongoClient;



function CreateCollection(db,collName){
    var url = "mongodb://localhost:27017/"+db;
    MongoClient.connect(url,(err,con)=>{
        if(err)
        {
            console.log(err.message);
            con.close();
            return false;
        }
        else{
            var dbo = con.db(db);
            dbo.createCollection(collName,(err,res)=>{
                if(err){
                    console.log(err.message);
                    con.close();
                    return false;
                }
                else{
                    console.log("Collection Created Sucessfully.....");
                    con.close();
                    return true;
                }
            })
        }
    })

}

function addDataInCollection(db,collName,obj){
    var url = "mongodb://localhost:27017/"+db;
    MongoClient.connect(url,(err,con)=>{
        if(err)
        console.log(err.message);
        else{
            let dbobj=con.db(db);
            dbobj.collection(collName).insertOne(obj,(err,res)=>{
                if(err){
                    console.log(err.message);
                }
                else{
                    console.log(res.insertedId); 
                    con.close();
                }
            });

        }
    });  
}

function addManyDataInCollection(db,collName,obj){
    var url = "mongodb://localhost:27017/"+db;
    MongoClient.connect(url,(err,con)=>{
        if(err)
        console.log(err.message);
        else{
            let dbobj=con.db(db);
            dbobj.collection(collName).insertMany(obj,(err,res)=>{
                if(err){
                    console.log(err.message);
                }
                else{
                    console.log(res.insertedIds); 
                    con.close();
                }
            });

        }
    });  
}

 function findAllRecords(db,collName){
    var url = "mongodb://localhost:27017/"+db;
    MongoClient.connect(url,(err,con)=>{
        if(err)
        {
            console.log(err.message);
            con.close();
            return null;
        }
        else{
            let dbobj=con.db(db);
             dbobj.collection(collName).find().toArray((err,res)=>{
                if(err){
                    {
                        console.log(err.message);
                        con.close();
                        return null;

                    }
                }
                else{
                    console.log(res); 
                    con.close();
                    return(res);
                }
            });

        }
    });  
}
function findRecordsByQur(db,collName,qur){
    var url = "mongodb://localhost:27017/"+db;
    MongoClient.connect(url,(err,con)=>{
        if(err)
        {
            console.log(err.message);
            con.close();
            return null;
        }
        else{
            let dbobj=con.db(db);
             dbobj.collection(collName).find(qur).toArray((err,res)=>{
                if(err){
                    {
                        console.log(err.message);
                        con.close();
                        return null;

                    }
                }
                else{
                    console.log(res); 
                    con.close();
                    return(res);
                }
            });

        }
    });  
}

function updateCollection(db,collName,qur,updObj){
    var url = "mongodb://localhost:27017/"+db;
    var newvalues={$set: updObj}
    MongoClient.connect(url,(err,con)=>{
        if(err)
        {
            console.log(err.message);
            con.close();
            return null;
        }
        else{
            let dbobj=con.db(db);
             dbobj.collection(collName).updateOne(qur, newvalues, (err, res)=>{
                if(err){
                    console.log(err.message);
                    con.close();
                    return null;
                }
                else{
                    console.log(res.matchedCount);
                    con.close(); 
                    return true;
                }
             });
        }
    });  

}




function deleteData(db,collName,qur){
    var url = "mongodb://localhost:27017/"+db;
    MongoClient.connect(url,(err,con)=>{
        if(err)
        {
            console.log(err.message);
            con.close();
            return null;
        }
        else{
            let dbobj=con.db(db);
             dbobj.collection(collName).deleteMany(qur,(err, res)=>{
                if(err){
                    console.log(err.message);
                    con.close();
                    return null;
                }
                else{
                    console.log(res);
                    con.close(); 
                    return true;
                }
             });
        }
    });  

}



//  var  q={"dept":"CSE"};
//  deleteData("ems","user",q);
// var uobj={"dept":"SE"}
// updateCollection("ems","user",q,uobj);




let qur={"team1":"Chennai Super Kings",  winner: 'Chennai Super Kings', player_of_match: 'DJ Bravo'}
findRecordsByQur("bilash","ipl",qur)
// let obj={"name":"Sourav","dept":"EE"};
// addDataInCollection("ems","user",obj)

/*
Insert Many Data At a Time
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
   
    dbo.collection("customers").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
  */
