const connection = require('./db');
const path = require('path');

//recipe functions
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
    const name = req.params.recepieName;
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
  
  
  const createNewRecipes = function(req,res){
    if (!req.body) {
      res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
    }
    const newRecipe = {
      "recipeName": req.body.recipeName,
      "ingridents": req.body.ingridents,
      "instructions": req.body.instructions,
      "dishImg": req.body.dishImg,
      "recipeType": req.body.recipeType
    };
    sql.query("INSERT INTO recipes SET ?", newRecipe, (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({message: "error in creating recipe: " + err});
      return;
    }
    console.log("created recipe: ", { id: mysqlres.insertId, ...newRecipe });
    res.send({message:"new recipe created successfully"});
    return;
    });
    };


//user functions
const signUptoDB = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    };

    // pull data from body to json

    const newCostomer = {
        "name": req.body.signUpName,
        "email": req.body.signUpEmail
    };

    // run query
    const Q1 = "INSERT INTO customers SET ?";
    connection.query(Q1, newCostomer, (err, mysqlres)=>{
        if (err) {
            console.log("error:", err);
            res.status(400).send({message: "error in SignUp " + err});
            return;
        }

        console.log("new customer created!");
        res.send("new customer created");
        return;
    });
};

module.exports = { getRecipe, getAllRecipes, createNewRecipes};
