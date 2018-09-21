const Request = require('./helpers/request.js');
//const dotenv = require('dotenv').config();

document.addEventListener('DOMContentLoaded', ()=>{

    const foodWeWant = "banana";
    const request = new Request();
 
    request.get(foodWeWant)
    .then((result) => {
        console.log(result);
        foodURI = result.hints[0].food.uri;
       // console.log(foodURI);
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
            console.log(result);
        })
    })
    .catch(console.error)

});