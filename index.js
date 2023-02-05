const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const {getRecipe} = require('./db/CRUD');
const CreateDB = require('./db/CreateDB')
const port = 8080;

app.use(express.static(path.join(__dirname)));
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());
app.set('view engine', 'pug');

// Static pages
app.get("/", (req,res)=>{
    res.redirect('/home');
});
app.get("/home", (req,res)=>{
    res.sendFile(__dirname+ '/views/html- index.html');
});
app.get("/ingredients", (req,res)=>{
    res.sendFile(__dirname+ '/views/ingredients.html');
});
app.get("/recipes", (req,res)=>{
    res.sendFile(__dirname+ '/views/Recipes.html');
});
app.get("/addrecipe", (req,res)=>{
    res.sendFile(__dirname+ '/views/addrecipe.html');
});


// routes for creating the DB
app.all('/CreateTables', CreateDB.createTables); 
app.all('/InsertDataToTables', CreateDB.InsertData2DB)


app.get("/:recepieName", getRecipe);

app.listen(port, ()=>{
    console.log('server is running on port ', port);
});