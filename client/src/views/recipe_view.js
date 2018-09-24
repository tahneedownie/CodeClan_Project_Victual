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
    let exclusionsArray = [];
    if(exclusions !== ""){
        exclusionsArray = exclusions.replace(/\s+/g, '').split(',');
    }
    console.log(health);
    console.log(exclusionsArray);
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientVitaminArray, health, exclusionsArray)
    .then((recipes)=>{
        this.render(recipes, deficientVitaminArray);
    });
}


RecipeView.prototype.render = function(recipes, deficientVitaminArray){
    const heading = document.createElement("h2");
    heading.textContent = "Recipes high in: ";
    deficientVitaminArray.forEach((vitamin,index)=>{
        heading.textContent += vitamin;
        if(index < deficientVitaminArray.length-1){
            heading.textContent += ", ";
        }
    })
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
    console.log(array);
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