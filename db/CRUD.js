const connection = require('./db');
const path = require('path');

const getRecipe = (req, res) => {
  const name = req.params.recepieName;
  connection.query('SELECT * FROM recipes WHERE recipeName like ?', name + '%', (err, mysqlres) => {
    if (err) {
      res.status(400).send({ message: err });
      return;
    }

    if (mysqlres[0]) {
      res.render(path.join(__dirname, '../views/recipe.pug'), {
        recipeName: mysqlres[0]?.recipeName,
        ingridents: mysqlres[0]?.ingridents?.split(', ') || [],
        instructions: mysqlres[0]?.instructions,
        dishImg: mysqlres[0]?.dishImg,
      });
    } else {
      res.render(path.join(__dirname, '../views/notFound.pug'), {
        recipeName: name,
      });
    }
  });
};

const getAllRecipes = async (req, res) => {
  connection.query('SELECT * FROM recipes', (err, mysqlres) => {
    if (err) {
      res.status(400).send({ message: err });
      return;
    }
    res.render(path.join(__dirname, '../views/Recipes.pug'), {
      breakfastRecepies: mysqlres?.filter(({ recipeType }) => recipeType === 'Breakfast') || [],
      lunchRecepies: mysqlres?.filter(({ recipeType }) => recipeType === 'Lunch') || [],
      dinnerRecepies: mysqlres?.filter(({ recipeType }) => recipeType === 'Dinner') || [],
    });
  });
};

const createNewRecipes = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const recipe = req?.body?.recipe;
  const newRecipe = {
    recipeName: recipe?.recipeName,
    ingridents: recipe?.ingridents,
    instructions: recipe?.instructions,
    dishImg: recipe?.dishImg,
    recipeType: recipe?.recipeType,
  };
  connection.query('INSERT INTO recipes SET ?', newRecipe, (err, mysqlres) => {
    if (err) {
      console.log('error: ', err);
      res.status(400).send({ message: 'error in creating recipe: ' + err });
      return;
    }
    console.log('created recipe: ', { id: mysqlres.insertId, ...newRecipe });
    res.send({ message: `new recipe ${recipe?.recipeName} created successfully` });
  });
};

module.exports = { getRecipe, getAllRecipes, createNewRecipes };
