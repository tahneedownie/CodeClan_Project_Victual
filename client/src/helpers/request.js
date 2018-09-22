const dotenv = require('dotenv');
dotenv.load();
const apiKey = process.env.API_KEY;
const applicationID = process.env.APPLICATION_ID;

const Request = function () {
};

Request.prototype.get = function (foodWeWant) {
    return fetch(`https://api.edamam.com/api/food-database/parser?ingr=${foodWeWant}&app_id=${applicationID}&app_key=${apiKey}`)
        .then((response) => response.json());
};

Request.prototype.post = function (payload) {
    return fetch(`https://api.edamam.com/api/food-database/nutrients?app_id=${applicationID}&app_key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json());
};

module.exports = Request;
