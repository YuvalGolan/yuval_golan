const connection = require('./db');
const path = require('path');

// recipe functions
const getRecipe = (req, res) => {
  const name = req.params.recepieName;
  connection.query('SELECT * FROM recipes WHERE recipeName like ?', name + '%', (err, mysqlres) => {
    if (err) {
      throw {status: 400, message: err };
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
      throw {status: 400, message: err };
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
    throw {status: 400, message: 'Content can not be empty!'};
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
      throw {status: 400, message:'error in creating recipe: ' + err };
    }
    console.log('created recipe: ', { id: mysqlres.insertId, ...newRecipe });
    res.send({ message: `new recipe ${recipe?.recipeName} created successfully` });
  });
};

//delete function- to delete recipe that I don't want in the recipes
const deleteRecipe = (req, res) => {
  if (!req.body) {
    throw {status: 400, message: 'Content can not be empty!'};
  }
  const name = req.params.recepieName;
  connection.query('DELETE FROM recipes WHERE recipeName like ?', name + '%', (err, mysqlres) => {
    if (err) {
      throw {status: 400, message: err };
      return;
    }
    res.send({ message: "recipe: " + name + " deleted" });

  });
};


//user functions
const createNewUser = (req, res) => {
  if (!req.body) {
    throw {status: 400, message: 'Content can not be empty!'};
  }

  const newUser = {
    "UserAddress": req?.body?.UserAddress,
    "UserPassword": req?.body?.UserPassword
};
  
  connection.query('INSERT INTO users SET ?', newUser, (err, mysqlres) => {
    if (err) {
      console.log('error: ', err);
      throw {status: 400, message: 'error in creating user: ' + err };
      return;
    }
    console.log('user created: ', { id: mysqlres.insertId, ...newUser });
    res.send({ message: "new user "+ newUser + "created successfully" });
  });
};

const login = (req, res, next) => {
  if (!req.body) {
    throw {status: 400, message: 'Content can not be empty!'};
  }

  const UserAddress = req?.body?.UserAddress;
  const UserPassword = req?.body?.UserPassword;
  if(UserAddress && UserPassword) {
      const query = `SELECT * FROM users WHERE UserAddress = "${UserAddress}" `;
      connection.query(query, (error, data) => {
          if(data.length > 0) {
              for(let count = 0; count < data.length; count++) {
                  if(data[count].UserPassword == UserPassword) {
                      res.send("success");
                      return;
                  }
              }
              res.status(401).send({ message: 'Incorrect Password'});
          } else {
            res.status(401).send({ message: 'Incorrect Email Address'});
          }
          res.end();
      });
  } else {
    throw {status: 400, message: 'Please Enter Email Address and Password Details'};
  }

};
  


module.exports = { getRecipe, getAllRecipes, createNewRecipes, deleteRecipe, createNewUser, login};
