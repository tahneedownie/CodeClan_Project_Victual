const PubSub = require('../helpers/pub_sub.js');
const DatabaseRequest = require('../helpers/database_request.js');

const Food = function(){
    this.databaseRequest = new DatabaseRequest('http://localhost:3000/api/user_food_items');
}

Food.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:food-submitted', (event)=>{
        const objectToSave = event.detail;
        this.save(objectToSave);
    });
}

Food.prototype.save = function(objectToSave){
   this.databaseRequest.post(objectToSave);
}

module.exports = Food;