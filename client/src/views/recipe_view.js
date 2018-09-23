const RecipeRequest = require('../helpers/recipe_request.js');

const RecipeView = function(container){
    this.container = container;
}

RecipeView.prototype.displayInitialSuggestions = function(deficientVitaminArray){
    this.container.innerHTML = "";
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientVitaminArray, "none", [])
    .then((recipes)=>{
        this.render(recipes, deficientVitaminArray);
    });
}

RecipeView.prototype.displayFilteredSuggestions = function(deficientVitaminArray, health, exclusions){
    this.container.innerHTML = "";
    const exclusionsArray = exclusions.replace(/\s+/g, '').split(',');
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientVitaminArray, health, exclusionsArray)
    .then((recipes)=>{
        this.render(recipes, deficientVitaminArray);
    });
}


RecipeView.prototype.render = function(recipes, deficientVitaminArray){
    const heading = document.createElement("h2");
    heading.textContent = "Here are some recipes high in ";
    for(let vitamin of deficientVitaminArray){
        heading.textContent += vitamin+" ";
    }
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
    return randomThree;
}

module.exports = RecipeView;