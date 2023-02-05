const connection = require('./db');
const path = require('path');


const getRecipe = (req,res)=>{
    const name = req.params.recepieName;
    connection.query("SELECT * FROM recipes WHERE recipeName like ?", name + "%", (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: err});
            return;
        }
        res.render(path.join(__dirname, '../views/recipe.pug'), {
            recipeName: mysqlres[0].recipeName,
            ingridents: mysqlres[0]?.ingridents?.split(", ") || [],
            instructions: mysqlres[0]?.instructions,
            dishImg: mysqlres[0]?.dishImg
        })
    });
}

module.exports = {getRecipe};