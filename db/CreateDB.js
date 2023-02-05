const connection = require('./db');
const csv  = require('csvtojson');
const path = require('path');

const createTables = (req,res)=>{
    const Q1 = "CREATE TABLE Table187 (UserName VARCHAR(255), UserPassword VARCHAR(255), TimeStamp TIMESTAMP)";
    const Q2 = "CREATE TABLE recipes (recipeName VARCHAR(200), ingridents VARCHAR(255), instructions VARCHAR(500), dishImg VARCHAR(255))";
    connection.query(Q1, (err, mysqlres)=>{
        if (err) {
            console.log({message: 'users table not created', err});
            return;
        }
        console.log({message: "users table created"})
    });
    connection.query(Q2, (err, mysqlres)=>{
        if (err) {
            console.log({message: 'recipes table not created', err});
            return;
        }
        console.log({message: "recipes table created"})
    });
    res.send({message: "Done"});
};

const InsertData2DB = (req,res)=>{
    // var Q2 = "INSERT INTO Table187 SET ?";
    // const csvFilePath= path.join(__dirname, "Data.csv");
    // csv()
    // .fromFile(csvFilePath)
    // .then((jsonObj)=>{
    // console.log(jsonObj); // for learning perpose
    // jsonObj.forEach(element => {
    //     var NewEntry = {
    //         "UserName": element.UserName,
    //         "UserPassword": element.UserPassword,
    //         'TimeStamp': element.TimeStamp
    //     }
    //     SQL.query(Q2, NewEntry, (err,mysqlres)=>{
    //         if (err) {
    //             console.log("error in inserting data", err);
    //         }
    //         console.log("created row sucssefuly ");
    //     });
    // });
    // });
    
    var Q2 = "INSERT INTO recipes SET ?";
    const reccipesCsvFilePath= path.join(__dirname, "recepies.csv");
    csv()
    .fromFile(reccipesCsvFilePath)
    .then((jsonObj)=>{
    console.log({jsonObj}); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "recipeName": element.recipeName,
            "ingridents": element.ingridents,
            "instructions": element.instructions,
            'dishImg': element.dishImg,
        };
        connection.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting reccipes data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });

    res.send("data inserted");

};

module.exports={createTables, InsertData2DB}