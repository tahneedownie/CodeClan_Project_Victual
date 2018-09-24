const PubSub = require('../helpers/pub_sub.js');
const DatabaseRequest = require('../helpers/database_request.js');

const Food = function(){
    this.databaseRequest = new DatabaseRequest('http://localhost:3000/api/user_food_items');
}

Food.prototype.bindEvents = function(){
    this.getExistingData();
    PubSub.subscribe('FormView:food-submitted', (event)=>{
        const objectToSave = event.detail;
        const amendedObjectToSave = this.extractTotalDaily(objectToSave);
        // console.log(amendedObjectToSave);
        this.save(amendedObjectToSave);
    });
    PubSub.subscribe('ListView:delete-all-clicked', (event) => {
        this.deleteAll();
    });
    PubSub.subscribe('ListView:delete-item-clicked', (event) => {
      const idToDelete = event.detail;
      this.delete(idToDelete);
    });
}

Food.prototype.getExistingData = function(){
  this.databaseRequest.get()
  .then((allData)=>{
    PubSub.publish('FormView:all-data-ready', allData);
  });
}

Food.prototype.extractTotalDaily = function (objectToSave){
    objectToSave.details = objectToSave.details.totalDaily;
    return objectToSave; 
}

Food.prototype.save = function(objectToSave){
   this.databaseRequest.post(objectToSave)
   .then((allData)=>{
       PubSub.publish('FormView:all-data-ready', allData);
   });
}

Food.prototype.deleteAll = function () {
    this.databaseRequest.deleteAll()
    .then((allData)=>{
        PubSub.publish('FormView:all-data-ready', allData);
      });
}

Food.prototype.delete = function (id) {
  this.databaseRequest.delete(id)
  .then((allData)=>{
    PubSub.publish('FormView:all-data-ready', allData);
  });

}

module.exports = Food;
