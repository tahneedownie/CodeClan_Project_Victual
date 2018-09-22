const FormView = require('./views/form_view.js');
const ListView = require('./views/list_view.js');
const Food = require('./models/food.js');
//const dotenv = require('dotenv').config();
const RecipeRequest = require('./helpers/recipe_request.js');
const NutrientRDA = require('./models/nutrient_RDA.js');

document.addEventListener('DOMContentLoaded', ()=>{

    const listDiv = document.querySelector('#food-list');
    const deleteAllButton = document.querySelector('#delete-all-button');
    const listView = new ListView(listDiv, deleteAllButton);
    listView.bindEvents();

    const form = document.querySelector('#food-form');
    const formView = new FormView(form);
    formView.bindEvents();

    const food = new Food();
    food.bindEvents();

    const recipeRequest = new RecipeRequest();
    recipeRequest.get("Calcium","vegan",["none"])
    .then((recipeData)=>{
        console.log(recipeData);
      });

    //  console.log(NutrientRDA.getMinimumContent("Protein", 50));
});