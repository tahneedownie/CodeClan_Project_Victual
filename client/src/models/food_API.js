const FoodAPIRequest = require('../helpers/food_API_request.js');
const RecipeAPIRequest = require('../helpers/recipe_API_request.js');
const PubSub = require('../helpers/pub_sub.js');

const FoodAPI = function(){}

FoodAPI.prototype.bindEvents = function(){
    PubSub.subscribe("SummaryView:nutrient-clicked", (event)=>{
        this.deficientNutrient = event.detail;
        const recipeAPIRequest = new RecipeAPIRequest();
        recipeAPIRequest.get(this.deficientNutrient, "none", [])
            .then((recipes) => {
                const recipesAndNutrient = {};
                recipesAndNutrient.recipes = recipes;
                recipesAndNutrient.nutrient = this.deficientNutrient;
                PubSub.publish("FoodAPI:recipe-info-ready", recipesAndNutrient);
            });
    });
    PubSub.subscribe("RecipeView:filtered-recipe-clicked", (event)=>{
        const health = event.detail.health;
        const exclusions = event.detail.exclusions;
        const recipeAPIRequest = new RecipeAPIRequest();
        recipeAPIRequest.get(this.deficientNutrient, health, exclusions)
            .then((recipes) => {
                const recipesAndNutrient = {};
                recipesAndNutrient.recipes = recipes;
                recipesAndNutrient.nutrient = this.deficientNutrient;
                PubSub.publish("FoodAPI:recipe-info-ready", recipesAndNutrient);
            });
    });
}


FoodAPI.prototype.queryFood = function(nameOfFood, numberOfUnits, unitSelected, dateSelectorValue){
    const foodAPIRequest = new FoodAPIRequest();
 
    foodAPIRequest.get(nameOfFood)
    .then((result) => {
        foodURI = result.hints[0].food.uri;
    })
    .then(()=>{
    objectToPost = 
    {
        "yield": 1,
        "ingredients": [
            {
                "quantity": 1,
                "measureURI": `http://www.edamam.com/ontologies/edamam.owl#Measure_${unitSelected}`,
                "foodURI": foodURI
            }
        ]
    }
    })
    .then(()=>{
        foodAPIRequest.post(objectToPost)
        .then((result) => {
            this.publishResult(nameOfFood, numberOfUnits, unitSelected, result, dateSelectorValue);
        })
    })
    .catch(console.error)
}


FoodAPI.prototype.publishResult = function(nameOfFood, numberOfUnits, unitSelected, result, dateSelectorValue){
    const objectToPublish = {
        name: nameOfFood,
        amount: numberOfUnits,
        measurement: unitSelected,
        date: dateSelectorValue,
        details: result
    };
    PubSub.publish('FoodAPI:food-submitted', objectToPublish);
}


module.exports = FoodAPI;