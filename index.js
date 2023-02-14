const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const { getRecipe, getAllRecipes, createNewRecipes, deleteRecipe,  createNewUser,login} = require('./db/CRUD');
const CreateDB = require('./db/CreateDB');
const {errorHandlerMiddleware} = require('./server/errorMiddleware');
const port = 3000;

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
app.get('/CreateTables', CreateDB.createTables);
app.get('/DropTables', CreateDB.dropTables);
app.get('/InsertDataToTables', CreateDB.InsertData2DB);
app.get('/showAllUsers', CreateDB.showAllUsers);
app.get('/showAllRecipes', CreateDB.showAllRecipes);


app.get('/:recepieName', getRecipe);
app.all('/delete/:recepieName', deleteRecipe);
app.post('/addRecipe', createNewRecipes);
app.post('/login', login);
app.post('/signIn', createNewUser);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log('server is running on port ', port);
});
