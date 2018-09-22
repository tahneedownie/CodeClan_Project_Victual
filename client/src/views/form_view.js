const APIRequest = require('../helpers/API_request.js');
const PubSub = require('../helpers/pub_sub.js');

const FormView = function(form){
    this.form = form;
}

FormView.prototype.bindEvents = function(){
    this.form.addEventListener('submit', (event)=>{
        event.preventDefault();
        this.handleEvent(event);
        this.form.reset();
    });
}

FormView.prototype.handleEvent = function(event){
    const nameOfFood = event.target.name.value;
    const numberOfGrams = event.target.numberOfGrams.value;
    this.queryAPI(nameOfFood, numberOfGrams);
}

FormView.prototype.queryAPI = function(nameOfFood, numberOfGrams){
    const APIrequest = new APIRequest();
 
    APIrequest.get(nameOfFood)
    .then((result) => {
        foodURI = result.hints[0].food.uri;
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
        APIrequest.post(objectToPost)
        .then((result) => {
            this.publishResult(nameOfFood, numberOfGrams, result);
        })
    })
    .catch(console.error)
}


FormView.prototype.publishResult = function(nameOfFood, numberOfGrams, result){
    const objectToPublish = {
        name: nameOfFood,
        grams: numberOfGrams,
        details: result
    };
    PubSub.publish('FormView:food-submitted', objectToPublish);
}

module.exports = FormView;