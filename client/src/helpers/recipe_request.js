const dotenv = require('dotenv');
dotenv.load();
const apiKey = process.env.RECIPE_API_KEY;
const applicationID = process.env.RECIPE_APPLICATION_ID;

const RecipeRequest = function () {
    this.url = `https://api.edamam.com/search?q=&app_id=${applicationID}&app_key=${apiKey}`;
};

RecipeRequest.prototype.get = function (vitaminWeWant, minimumContent, healthRequirement, exclusionsArray) {
    return fetch(`${this.buildQueryString(vitaminWeWant, minimumContent, healthRequirement, exclusionsArray)}`)
        .then((response) => response.json());
};

RecipeRequest.prototype.buildQueryString = function(vitaminWeWant, minimumContent, healthRequirement, exclusionsArray){
    let query = "";
    query += this.url;
    query += `&nutrients%5B${vitaminWeWant}%5D=${minimumContent}%2B&from=0&to=5`;
    query += `&health=${healthRequirement}`;
    if(!exclusionsArray.includes('none')){
        exclusionsArray.forEach((requirement)=>{
            query += `&exclusion=${requirement}`;
        });
    }
    return query;
}


module.exports = RecipeRequest;
