const connection = require('./db');
const path = require('path');

// recipe functions
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

//user functions
const createNewUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const newUser = {
    "UserAddress": req?.body?.users?.UserAddress,
    "UserPassword": req?.body?.users?.UserPassword
};
  
  connection.query('INSERT INTO users SET ?', newUser, (err, mysqlres) => {
    if (err) {
      console.log('error: ', err);
      res.status(400).send({ message: 'error in creating user: ' + err });
      return;
    }
    console.log('user created: ', { id: mysqlres.insertId, ...newRecipe });
    res.send({ message: `new user ${users?.UserAddress} created successfully` });
  });
};

const connectUser = (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const UserAddress = req?.body?.recipe?.UserAddress;
  const UserPassword = req?.body?.recipe?.UserPassword;

  if(UserAddress && UserPassword) {
      query = `SELECT * FROM users 
      WHERE UserAddress = "${UserAddress}" `;

      connection.query(query, function(error, data){

          if(data.length > 0){
              for(var count = 0; count < data.length; count++)
              {
                  if(data[count].UserPassword == UserPassword)
                  {
                      res.redirect("/");
                  }
                  else
                  {
                      res.send('Incorrect Password');
                  }
              }
          }
          else
          {
              res.send('Incorrect Email Address');
          }
          res.end();
      });
  }
  else
  {
      res.send('Please Enter Email Address and Password Details');
      res.end();
  }

});
  


module.exports = { getRecipe, getAllRecipes, createNewRecipes, createNewUser, connectUser };
