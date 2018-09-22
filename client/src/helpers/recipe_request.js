const dotenv = require('dotenv');
dotenv.load();
const apiKey = process.env.RECIPE_API_KEY;
const applicationID = process.env.RECIPE_APPLICATION_ID;

const RecipeRequest = function () {
    this.url = "https://api.edamam.com/search?q=%20"
};

RecipeRequest.prototype.get = function (vitaminWeWant, minimumContent) {
    return fetch(`${this.url}&nutrients%5B${vitaminWeWant}%5D=${minimumContent}&app_id=${applicationID}&app_key=${apiKey}`)
        .then((response) => response.json());
};


module.exports = RecipeRequest;
