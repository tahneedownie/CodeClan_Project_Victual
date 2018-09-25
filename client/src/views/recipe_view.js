const PubSub = require('../helpers/pub_sub.js');
const RecipeRequest = require('../helpers/recipe_request.js');

const RecipeView = function (container) {
    this.container = container;
}

RecipeView.prototype.bindEvents = function () {
    PubSub.subscribe("SummaryView:nutrient-clicked", (event) => {

        this.container.style.display = "block";
        this.nutrientName = event.detail;
        this.displayInitialSuggestions(this.nutrientName);
    })
}

RecipeView.prototype.displayInitialSuggestions = function (deficientNutrient) {
    const recipeListContainer = document.querySelector('#recipe-suggestions');
    recipeListContainer.innerHTML = "";

    this.createForm();

    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientNutrient, "none", [])
        .then((recipes) => {
            this.render(recipes, deficientNutrient);
        });
}

RecipeView.prototype.createForm = function () {
    const filterRecipeForm = document.querySelector('#filter-recipes');
    filterRecipeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const exclusions = event.target.exclusions.value;
        const health = event.target.health.value;
        this.displayFilteredSuggestions(this.nutrientName, health, exclusions);
        filterRecipeForm.reset();
    });
}

RecipeView.prototype.displayFilteredSuggestions = function (deficientNutrient, health, exclusions) {
    const recipeListContainer = document.querySelector('#recipe-suggestions');
    recipeListContainer.innerHTML = "";
    let exclusionsArray = [];
    if (exclusions !== "") {
        exclusionsArray = exclusions.replace(/\s+/g, '').split(',');
    }
    const recipeRequest = new RecipeRequest();
    recipeRequest.get(deficientNutrient, health, exclusionsArray)
        .then((recipes) => {
            this.render(recipes, deficientNutrient, health);
        });
}


RecipeView.prototype.render = function (recipes, deficientNutrient) {
    const recipeListContainer = document.querySelector('#recipe-suggestions');
    recipeListContainer.innerHTML = "";
    const heading = document.createElement("h2");
    heading.className = 'recipe-suggestions-heading';
    heading.textContent = `Recipes high in: ${deficientNutrient}`;
    recipeListContainer.appendChild(heading);

    const randomThreeRecipes = this.getRandomThree(recipes.hits);
    if (randomThreeRecipes.length === 0) {
        const noResults = document.createElement("h3");
        noResults.className = 'no-recipe-results-message';
        noResults.textContent = "Sorry, no results found."
        recipeListContainer.appendChild(noResults);
    }
    else {
        for (let recipeObject of randomThreeRecipes) {
            console.log(recipeObject);

            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe-title-img-div';

            const title = document.createElement("h3");
            title.textContent = recipeObject.recipe.label;
            const url = document.createElement("a");
            url.setAttribute("href", recipeObject.recipe.url);
            // url.textContent = recipeObject.recipe.url;
            // recipeListContainer.appendChild(title);
            url.className = 'title-of-recipe';
            url.appendChild(title);
            recipeDiv.appendChild(url);


            const recipeImage = document.createElement('img');
            recipeImage.src = recipeObject.recipe.image;
            url.appendChild(recipeImage);

            recipeListContainer.appendChild(recipeDiv);
        }
    }
}

RecipeView.prototype.getRandomThree = function (array) {
    const randomThree = [];
    if (array.length <= 3) {
        return array;
    }
    while (randomThree.length < 3) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomElement = array[randomIndex];
        if (!randomThree.includes(randomElement)) {
            randomThree.push(randomElement);
        }
    }
    return randomThree;
}

module.exports = RecipeView;