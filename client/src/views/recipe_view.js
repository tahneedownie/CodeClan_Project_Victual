const RecipeRequest = require('../helpers/recipe_request.js');

const RecipeView = function(container){
    this.container = container;
}

RecipeView.prototype.displayInitialSuggestions = function(deficientVitamin){
    this.container.innerHTML = "";
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientVitamin, "none", [])
    .then((recipes)=>{
        this.render(recipes, deficientVitamin);
    });
}

RecipeView.prototype.displayFilteredSuggestions = function(deficientVitamin, health, exclusions){
    this.container.innerHTML = "";
    const exclusionsArray = exclusions.replace(/\s+/g, '').split(',');
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientVitamin, health, exclusionsArray)
    .then((recipes)=>{
        this.render(recipes, deficientVitamin);
    });
}


RecipeView.prototype.render = function(recipes, deficientVitamin){
    const heading = document.createElement("h2");
    heading.textContent = `Here are some recipes high in ${deficientVitamin}`;
    this.container.appendChild(heading);
    for(let recipeObject of recipes.hits){
        const title = document.createElement("h3");
        title.textContent = recipeObject.recipe.label;
        const url = document.createElement("a");
        url.setAttribute("href", recipeObject.recipe.url);
        url.textContent = recipeObject.recipe.url;
        this.container.appendChild(title);
        this.container.appendChild(url);
    }
    
}

module.exports = RecipeView;