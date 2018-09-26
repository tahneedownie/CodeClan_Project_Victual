const APIRequest = require('../helpers/API_request.js');
const PubSub = require('../helpers/pub_sub.js');
const FoodAPI = require('../models/food_API.js');

const FormView = function(form, dateSelector){
    this.form = form;
    this.dateSelector = dateSelector;
}

FormView.prototype.bindEvents = function(){
    this.form.addEventListener('submit', (event)=>{
        event.preventDefault();
        const recipeDiv = document.querySelector('#recipes-container');
        recipeDiv.style.display = "none";
        this.handleEvent(event);
        this.form.reset();
    });
}

FormView.prototype.handleEvent = function(event){
    const nameOfFood = event.target.name.value;
    const numberOfUnits = event.target.numberOfUnits.value; 
    const unitSelected = event.target.measurementDropdown.value;
    const foodAPI = new FoodAPI();
    foodAPI.queryFood(nameOfFood, numberOfUnits, unitSelected, this.dateSelector.value);
}

module.exports = FormView;