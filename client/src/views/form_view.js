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
    const numberOfUnits = event.target.numberOfUnits.value; 
    const unitSelected = event.target.measurementDropdown.value;
    // console.log(unitSelected);
    this.queryAPI(nameOfFood, numberOfUnits, unitSelected);
}

FormView.prototype.queryAPI = function(nameOfFood, numberOfUnits, unitSelected){
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
                "measureURI": `http://www.edamam.com/ontologies/edamam.owl#Measure_${unitSelected}`,
                "foodURI": foodURI
            }
        ]
    }
    })
    .then(()=>{
        APIrequest.post(objectToPost)
        .then((result) => {
            this.publishResult(nameOfFood, numberOfUnits, unitSelected, result);
        })
    })
    .catch(console.error)
}


FormView.prototype.publishResult = function(nameOfFood, numberOfUnits, unitSelected, result){
    const objectToPublish = {
        name: nameOfFood,
        amount: numberOfUnits,
        measurement: unitSelected,
        details: result
    };
    console.log(objectToPublish);
    PubSub.publish('FormView:food-submitted', objectToPublish);
}

module.exports = FormView;