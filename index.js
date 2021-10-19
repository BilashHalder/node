var MongoClient = require('mongodb').MongoClient;

var express=require('express');
var app=express();


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



async function find(dbq,collName,qur){
    var url = "mongodb://localhost:27017/";
    const client=await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
    if (!client) {
        return;
    }

    try {

        const db = client.db(dbq);

        let collection = db.collection(collName);

        let res = await collection.findOne(qur);

        //console.log(res);
        return res;

    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
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
                    return res;
                }
             });
        }
    });  

}


 app.get("/",async(req,res)=>{
    let qur={};
    var url = "mongodb://localhost:27017/";
    const client=await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
    if (!client) {
        res.send("Sorry")
        return;
    }

    try {
        const db = client.db("ipl");

        let collection = db.collection("match_info");

        let resu = await collection.find();
        console.log(resu)
        res.send(resu)

    } catch (err) {

        res.send(err);
    } finally {

        client.close();
    }
    
});
app.listen(4000,(err)=>{
    if(err)
    console.log(err);
    else{
        console.log("Server Running on port 4000");
    }
});

//  var  q={"dept":"CSE"};
//  deleteData("ems","user",q);
// var uobj={"dept":"SE"}
// updateCollection("ems","user",q,uobj);




// let qur={"team1":"Chennai Super Kings",  winner: 'Chennai Super Kings', player_of_match: 'DJ Bravo'}
// findRecordsByQur("bilash","ipl",qur)
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
