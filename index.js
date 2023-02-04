const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const sql = require('./db/db');
const CreateDB = require('./db/CreateDB')
const port = 8080;

app.use(express.static(path.join(__dirname)));
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());
// app.set('views', path.join(__dirname, 'views'));


app.get("/", (req,res)=>{
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
app.get("/:recepieName", (req,res)=>{
    res.sendFile(__dirname+ `/views/${req.params.recepieName}.html`);
});


app.get("/page2", (req,res)=>{
    res.render('index', {
        v1: 'Hi Page 2'
    })
});

// routes for creating the DB
app.all('/CreateTables', CreateDB.createTables); 
app.all('/InsertDataToTables', CreateDB.InsertData2DB)

app.listen(port, ()=>{
    console.log('server is running on port ', port);
});