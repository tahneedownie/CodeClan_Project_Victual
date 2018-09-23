const dotenv = require('dotenv');
dotenv.load();
const apiKey = process.env.RECIPE_API_KEY;
const applicationID = process.env.RECIPE_APPLICATION_ID;
const NutrientRDA = require('../models/nutrient_RDA.js');

const RecipeRequest = function () {
    this.url = `https://api.edamam.com/search?q=&app_id=${applicationID}&app_key=${apiKey}`;
};

RecipeRequest.prototype.get = function (deficientVitaminArray, healthRequirement, exclusionsArray) {
    return fetch(`${this.buildQueryString(deficientVitaminArray, healthRequirement, exclusionsArray)}`)
        .then((response) => response.json());
};

RecipeRequest.prototype.buildQueryString = function(deficientVitaminArray, healthRequirement, exclusionsArray){
    let query = "";
    query += this.url;
    query += this.getNutrientQuery(deficientVitaminArray);
    query += this.getNumberOfResultsQuery();
    query += this.getHealthRequirementQuery(healthRequirement);
    query += this.getExclusionsQuery(exclusionsArray);
    console.log(query);
    return query;
}

RecipeRequest.prototype.getNumberOfResultsQuery = function(){
    return "from=0&to=20";
}

RecipeRequest.prototype.getHealthRequirementQuery = function(healthRequirement){
    if(healthRequirement !== "none"){
        return `&health=${healthRequirement}`;
    }
    else{
        return "";
    }
}

RecipeRequest.prototype.getExclusionsQuery = function(exclusionsArray){
    let exclusionsQuery = "";
    if(exclusionsArray.length !== 0){
        exclusionsArray.forEach((requirement)=>{
             exclusionsQuery += `&excluded=${requirement}`;
        });
    }
    return exclusionsQuery;
}

RecipeRequest.prototype.getNutrientQuery = function(deficientVitaminArray){
    let nutrientQuery = "&nutrients";
    for(let vitamin of deficientVitaminArray){
        nutrientQuery += `%5B${this.getShortHand(vitamin)}%5D=${this.getMinimumContent(vitamin)}%2B&`
    };
    return nutrientQuery;
}

RecipeRequest.prototype.getShortHand = function(vitamin){
    return NutrientRDA.nutrients[vitamin].shortHand;
}

RecipeRequest.prototype.getMinimumContent = function(vitamin){
    return 0.5 * NutrientRDA.nutrients[vitamin].RDA;
}


module.exports = RecipeRequest;
