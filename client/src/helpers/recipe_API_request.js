const dotenv = require('dotenv');
dotenv.load();
const apiKey = process.env.RECIPE_API_KEY;
const applicationID = process.env.RECIPE_APPLICATION_ID;
const NutrientRDA = require('../models/nutrient_RDA.js');
const RecipeAPIRequest = function () {
    this.url = `https://api.edamam.com/search?q=&app_id=${applicationID}&app_key=${apiKey}`;
};
RecipeAPIRequest.prototype.get = function (deficientNutrient, healthRequirement, exclusionsArray) {
    // console.log(deficientNutrient);
    return fetch(`${this.buildQueryString(deficientNutrient, healthRequirement, exclusionsArray)}`)
        .then((response) => response.json());
};
RecipeAPIRequest.prototype.buildQueryString = function(deficientNutrient, healthRequirement, exclusionsArray){
    let query = "";
    query += this.url;
    query += this.getNutrientQuery(deficientNutrient);
    query += this.getNumberOfResultsQuery();
    query += this.getHealthRequirementQuery(healthRequirement);
    query += this.getExclusionsQuery(exclusionsArray);
    return query;
}
RecipeAPIRequest.prototype.getNumberOfResultsQuery = function(){
    return "from=0&to=20";
}
RecipeAPIRequest.prototype.getHealthRequirementQuery = function(healthRequirement){
    if(healthRequirement !== "none"){
        return `&health=${healthRequirement}`;
    }
    else{
        return "";
    }
}
RecipeAPIRequest.prototype.getExclusionsQuery = function(exclusionsArray){
    let exclusionsQuery = "";
    if(exclusionsArray.length !== 0){
        exclusionsArray.forEach((requirement)=>{
             exclusionsQuery += `&excluded=${requirement}`;
        });
    }
    return exclusionsQuery;
}
RecipeAPIRequest.prototype.getNutrientQuery = function(deficientNutrient){
    let nutrientQuery = "&nutrients";
    nutrientQuery += `%5B${this.getShortHand(deficientNutrient)}%5D=${this.getMinimumContent(deficientNutrient)}%2B&`
    return nutrientQuery;
}
RecipeAPIRequest.prototype.getShortHand = function(vitamin){
    return NutrientRDA.nutrients[vitamin].shortHand;
}
RecipeAPIRequest.prototype.getMinimumContent = function(vitamin){
    return 0.5 * NutrientRDA.nutrients[vitamin].RDA;
}
module.exports = RecipeAPIRequest;
