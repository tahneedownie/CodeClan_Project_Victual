const PubSub = require('../helpers/pub_sub.js');
const DatabaseRequest = require('../helpers/database_request.js');

const Food = function(){

}

Food.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:food-submitted', (event)=>{
        const objectToSave = event.detail;
        this.save(objectToSave);
    });
}

Food.prototype.save = function(objectToSave){
    //const databaseRequest = new DatabaseRequest("localhost:3000");
  //  databaseRequest.post(objectToSave)
    console.log(objectToSave)
}

module.exports = Food;