const PubSub = require('../helpers/pub_sub.js');

const RecipeRequest = require('../helpers/recipe_request.js');

const RecipeView = function(container){
    this.container = container;
}

RecipeView.prototype.bindEvents = function(){
    PubSub.subscribe("SummaryView:nutrient-clicked", (event)=>{
        
        this.container.style.display = "block";
        const nutrientName = event.detail;
        this.displayInitialSuggestions(nutrientName);
    })
}

RecipeView.prototype.displayInitialSuggestions = function(deficientNutrient){
    const recipeListContainer = document.querySelector('#recipe-suggestions');
    recipeListContainer.innerHTML = "";
    
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientNutrient, "none", [])
    .then((recipes)=>{
        this.render(recipes, deficientNutrient);
    });
}

RecipeView.prototype.displayFilteredSuggestions = function(deficientNutrient, health, exclusions){
    this.container.innerHTML = "";
    let exclusionsArray = [];
    if(exclusions !== ""){
        exclusionsArray = exclusions.replace(/\s+/g, '').split(',');
    }
    console.log(health);
    console.log(exclusionsArray);
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientNutrient, health, exclusionsArray)
    .then((recipes)=>{
        this.render(recipes, deficientNutrient);
    });
}


RecipeView.prototype.render = function(recipes, deficientNutrient){
    const heading = document.createElement("h2");
    heading.textContent = "Recipes high in: ";
    heading.textContent += deficientNutrient;
    this.container.appendChild(heading);
    const randomThreeRecipes = this.getRandomThree(recipes.hits);
    if(randomThreeRecipes.length === 0){
        const noResults = document.createElement("h3");
        noResults.textContent = "Sorry, no results found."
        this.container.appendChild(noResults);
    }
    else{
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
}

RecipeView.prototype.getRandomThree = function(array){
    const randomThree = [];
    if(array.length <= 3){
        return array;
    }
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