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
    const randomThreeRecipes = this.getRandomThree(recipes.hits);
    for(let recipeObject of randomThreeRecipes){
        const title = document.createElement("h3");
        title.textContent = recipeObject.recipe.label;
        const url = document.createElement("a");
        url.setAttribute("href", recipeObject.recipe.url);
        url.textContent = recipeObject.recipe.url;
        this.container.appendChild(title);
        this.container.appendChild(url);
    }
}

RecipeView.prototype.getRandomThree = function(array){
    const randomThree = [];
    while(randomThree.length < 3){
        const randomIndex = Math.floor(Math.random()*array.length);
        const randomElement = array[randomIndex];
        if(!randomThree.includes(randomElement)){
            randomThree.push(randomElement);
        }
    }
    console.log(randomThree);
    return randomThree;
}

module.exports = RecipeView;