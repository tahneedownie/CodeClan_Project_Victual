const FormView = require('./views/form_view.js');
const ListView = require('./views/list_view.js');
const Food = require('./models/food.js');
//const dotenv = require('dotenv').config();
const RecipeRequest = require('./helpers/recipe_request.js');
const RecipeView = require('./views/recipe_view.js');
const FilterRecipeView = require('./views/filter_recipe_view.js');

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

    const recipeDiv = document.querySelector("#recipe-suggestions");
    const filterRecipeForm = document.querySelector('#filter-recipes');
    const filterRecipeView = new FilterRecipeView(filterRecipeForm, recipeDiv, "Calcium");
    filterRecipeView.bindEvents();

});