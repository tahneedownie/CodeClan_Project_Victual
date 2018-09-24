// const RecipeView = require('./recipe_view.js');

// const FilterRecipeView = function(form){
//     this.form = form;
// }

// FilterRecipeView.prototype.bindEvents = function(){
//     this.form.addEventListener('submit', (event)=>{
//         event.preventDefault();
//         this.handleEvent(event);
//         this.form.reset();
//     });
// }

// FilterRecipeView.prototype.handleEvent = function(event){
//     const exclusions = event.target.exclusions.value;
//     const health = event.target.health.value;
//     const recipeDiv = document.querySelector("#recipe-suggestions");
//     const recipeView = new RecipeView(recipeDiv);
//     recipeView.displayFilteredSuggestions(this.deficientVitaminArray, health, exclusions);
// }

// module.exports = FilterRecipeView;
