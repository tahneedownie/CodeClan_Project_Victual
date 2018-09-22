const RecipeView = require('./recipe_view.js');

const FilterRecipeView = function(form, recipeContainer, deficientVitamin){
    this.form = form;
    this.recipeContainer = recipeContainer;
    this.deficientVitamin = deficientVitamin;
    this.recipeView = new RecipeView(recipeContainer);
}

FilterRecipeView.prototype.bindEvents = function(){
    this.recipeView.displayInitialSuggestions(this.deficientVitamin);
    this.form.addEventListener('submit', (event)=>{
        event.preventDefault();
        this.handleEvent(event);
        this.form.reset();
    });
}

FilterRecipeView.prototype.handleEvent = function(event){
    const exclusions = event.target.exclusions.value;
    const health = event.target.health.value;
    this.recipeView.displayFilteredSuggestions(this.deficientVitamin, health, exclusions);
}

module.exports = FilterRecipeView;
