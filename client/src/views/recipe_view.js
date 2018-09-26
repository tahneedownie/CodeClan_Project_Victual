const PubSub = require('../helpers/pub_sub.js');

const RecipeView = function (container) {
    this.container = container;
}

RecipeView.prototype.bindEvents = function () {
    this.addFormListener();
    PubSub.subscribe("FoodAPI:recipe-info-ready", (event) => {
        this.container.style.display = "block";
        this.render(event.detail.recipes, event.detail.nutrient);
    });
}

RecipeView.prototype.addFormListener = function () {
    const filterRecipeForm = document.querySelector('#filter-recipes');
    filterRecipeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const exclusions = event.target.exclusions.value;
        const health = event.target.health.value;
        this.publishFilteredRecipeRequest(this.nutrientName, health, exclusions);
        filterRecipeForm.reset();
    });
}

RecipeView.prototype.publishFilteredRecipeRequest = function (deficientNutrient, health, exclusions) {
    let exclusionsArray = [];
    if (exclusions !== "") {
        exclusionsArray = exclusions.replace(/\s+/g, '').split(',');
    }
    const recipeQuery = {};
    recipeQuery.nutrient = deficientNutrient;
    recipeQuery.health = health;
    recipeQuery.exclusions = exclusionsArray;
    PubSub.publish("RecipeView:filtered-recipe-clicked", recipeQuery);
}

RecipeView.prototype.render = function (recipes, deficientNutrient) {
    const recipeListContainer = this.wipeRecipeSuggestions();
    const heading = this.createRecipeSectionHeading(deficientNutrient);
    recipeListContainer.appendChild(heading);
    const randomThreeRecipes = this.getRandomThree(recipes.hits);

    if (randomThreeRecipes.length === 0) {
        const noResultsMessage = this.generateNoResultsMessage();
        recipeListContainer.appendChild(noResultsMessage);
    } else {
        const recipeImagesDiv = document.createElement('div');
        recipeImagesDiv.className = 'recipe-images-div';
        for (let recipeObject of randomThreeRecipes) {
            const recipeDiv = this.renderRecipe(recipeObject);
            recipeImagesDiv.appendChild(recipeDiv);
        }
        recipeListContainer.appendChild(recipeImagesDiv);
    }
}

RecipeView.prototype.wipeRecipeSuggestions = function () {
    const recipeListContainer = document.querySelector('#recipe-suggestions');
    recipeListContainer.innerHTML = "";
    return recipeListContainer;
}

RecipeView.prototype.createRecipeSectionHeading = function (deficientNutrient) {
    const heading = document.createElement("h2");
    heading.className = 'recipe-suggestions-heading';
    heading.textContent = `RECIPES HIGH IN ${deficientNutrient.toUpperCase()}`;
    return heading;
}

RecipeView.prototype.generateNoResultsMessage = function () {
    const noResultsMessage = document.createElement("h3");
    noResultsMessage.className = 'no-recipe-results-message';
    noResultsMessage.textContent = "Sorry, no results found.";
    return noResultsMessage;
}

RecipeView.prototype.renderRecipe = function (recipeObject) {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe-title-img-div';

    const title = this.createSingleRecipeHeading(recipeObject);
    const url = this.createSingleRecipeLink(recipeObject);
    url.appendChild(title);
    recipeDiv.appendChild(url);

    const recipeImage = this.createSingleRecipeImage(recipeObject);
    url.appendChild(recipeImage);
    return recipeDiv;
}

RecipeView.prototype.createSingleRecipeHeading = function (recipeObject) {
    const title = document.createElement("h3");
    title.textContent = recipeObject.recipe.label;
    return title;
}

RecipeView.prototype.createSingleRecipeLink = function (recipeObject) {
    const url = document.createElement("a");
    url.setAttribute("href", recipeObject.recipe.url);
    url.className = 'title-of-recipe';
    url.setAttribute('target', '_blank');
    return url;
}

RecipeView.prototype.createSingleRecipeImage = function (recipeObject) {
    const recipeImage = document.createElement('img');
    recipeImage.src = recipeObject.recipe.image;
    return recipeImage;
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