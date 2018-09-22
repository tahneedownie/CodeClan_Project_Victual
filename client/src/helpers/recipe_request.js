const dotenv = require('dotenv');
dotenv.load();
const apiKey = process.env.RECIPE_API_KEY;
const applicationID = process.env.RECIPE_APPLICATION_ID;
const NutrientRDA = require('../models/nutrient_RDA.js');

const RecipeRequest = function () {
    this.url = `https://api.edamam.com/search?q=&app_id=${applicationID}&app_key=${apiKey}`;
};

RecipeRequest.prototype.get = function (vitamin, healthRequirement, exclusionsArray) {
    return fetch(`${this.buildQueryString(vitamin, healthRequirement, exclusionsArray)}`)
        .then((response) => response.json());
};

RecipeRequest.prototype.buildQueryString = function(vitamin, healthRequirement, exclusionsArray){
    let query = "";
    query += this.url;
    query += `&nutrients%5B${this.getShortHand(vitamin)}%5D=${this.getMinimumContent(vitamin)}`;
    query += "%2B&from=0&to=5";
    if(healthRequirement !== "none"){
        query += `&health=${healthRequirement}`;
    }
    if(!exclusionsArray.includes('none')){
        exclusionsArray.forEach((requirement)=>{
            query += `&exclusion=${requirement}`;
        });
    }
    return query;
}

RecipeRequest.prototype.getShortHand = function(vitamin){
    return NutrientRDA.nutrients[vitamin].shortHand;
}

RecipeRequest.prototype.getMinimumContent = function(vitamin){
    return 0.5 * NutrientRDA.nutrients[vitamin].RDA;
}


module.exports = RecipeRequest;
