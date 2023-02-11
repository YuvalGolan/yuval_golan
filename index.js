const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const { getRecipe, getAllRecipes, createNewRecipes } = require('./db/CRUD');
const CreateDB = require('./db/CreateDB');
const port = 8080;

app.use(express.static(path.join(__dirname)));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.set('view engine', 'pug');

// ** Static pages ** //
// Home page
app.get('/', (req, res) => {
  res.redirect('/home');
});
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/views/html- index.html');
});
// Recipes list
app.get('/recipes', getAllRecipes);
// Add recipe
app.get('/addrecipe', (req, res) => {
  res.sendFile(__dirname + '/views/addrecipe.html');
});

// routes for creating the DB
app.all('/CreateTables', CreateDB.createTables);
app.all('/DropTables', CreateDB.dropTables);
app.all('/InsertDataToTables', CreateDB.InsertData2DB);

app.get('/:recepieName', getRecipe);
app.post('/addRecipe', createNewRecipes);

app.listen(port, () => {
  console.log('server is running on port ', port);
});
