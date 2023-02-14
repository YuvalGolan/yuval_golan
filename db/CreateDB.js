const connection = require('./db');
const csv = require('csvtojson');
const path = require('path');

//function theat create the table

const createTables = (req, res) => {
    const Q1 =
      'CREATE TABLE users (UserAddress VARCHAR(255), UserPassword VARCHAR(255)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4';
    const Q2 =
      'CREATE TABLE recipes (recipeName VARCHAR(200), ingridents VARCHAR(255), instructions VARCHAR(500), dishImg VARCHAR(5000), recipeType VARCHAR(255)) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    connection.query(Q1, (err, mysqlres) => {
      if (err) {
        console.log({ message: 'users table not created', err });
        return;
      }
      console.log({ message: 'users table created' });
    });
    connection.query(Q2, (err, mysqlres) => {
      if (err) {
        console.log({ message: 'recipes table not created', err });
        return;
      }
      console.log({ message: 'recipes table created' });
    });
    res.send({ message: 'Done' });
  };
  
  const dropTables = (req, res) => {
    const Q1 = 'DROP TABLE users';
    const Q2 = 'DROP TABLE recipes';
    connection.query(Q1, (err, mysqlres) => {
      if (err) {
        console.log({ message: 'users table not deleted', err });
        return;
      }
      console.log({ message: 'users table deleted' });
    });
    connection.query(Q2, (err, mysqlres) => {
      if (err) {
        console.log({ message: 'recipes table not deleted', err });
        return;
      }
      console.log({ message: 'recipes table deleted' });
    });
    res.send({ message: 'Done' });
  };


const InsertData2DB = (req,res)=>{
    var Q1 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "Data.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj); // for learning perpose
    jsonObj.forEach(element => {
        var NewEntry = {
            "UserName": element.UserName,
            "UserPassword": element.UserPassword,
        }
        SQL.query(Q1, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    
  var Q2 = 'INSERT INTO recipes SET ?';
  const reccipesCsvFilePath = path.join(__dirname, 'recepies.csv');
  csv()
    .fromFile(reccipesCsvFilePath)
    .then(jsonObj => {
      console.log({ jsonObj }); // for learning perpose
      jsonObj.forEach(element => {
        var NewEntry = {
          recipeName: element.recipeName,
          ingridents: element.ingridents,
          instructions: element.instructions,
          dishImg: element.dishImg,
          recipeType: element.recipeType,
        };
        connection.query(Q2, NewEntry, (err, mysqlres) => {
          if (err) {
            console.log('error in inserting reccipes data', err);
          }
          console.log('created row sucssefuly ');
        });
      });
    });

  res.send('data inserted');
};


const showAllUsers = (req,res)=>{
  const Q1 = "SELECT * FROM users";
  connection.query(Q1, (err, mysqlres)=>{
      if (err) {
          console.log("error:", err);
          res.status(400).send({message: "error in selecting all users " + err});
          return;
      };
      console.log("success in selecting all users");
      res.send(mysqlres);
      return;
  })
};

const showAllRecipes = (req,res)=>{
  const Q2 = "SELECT * FROM recipes";
  connection.query(Q2, (err, mysqlres)=>{
      if (err) {
          console.log("error:", err);
          res.status(400).send({message: "error in selecting all recipes " + err});
          return;
      };
      console.log("success in selecting all recipes");
      res.send(mysqlres);
      return;
  })
};

module.exports = { createTables, InsertData2DB, dropTables, showAllUsers, showAllRecipes };
