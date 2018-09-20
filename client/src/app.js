const Request = require('./helpers/request.js');

document.addEventListener('DOMContentLoaded', ()=>{
    
    const foodWeWant = "toast";
    const request = new Request();
 
    request.get(foodWeWant)
    .then((result) => {
        foodURI = result.parsed[0].food.uri;
    })
    .then(()=>{
    objectToPost = 
    {
        "yield": 1,
        "ingredients": [
            {
                "quantity": 1,
                "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                "foodURI": foodURI
            }
        ]
    }
    })
    .then(()=>{
        request.post(objectToPost)
        .then((result) => {
            nutritionInfoPerGram = result.totalNutrients;
            console.log(nutritionInfoPerGram);
        })
    })
    .catch(console.error)

});