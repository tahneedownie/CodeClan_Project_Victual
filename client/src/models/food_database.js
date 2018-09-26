const PubSub = require('../helpers/pub_sub.js');
const DatabaseRequest = require('../helpers/database_request.js');

const FoodDatabase = function(dateSelector){
    this.databaseRequest = new DatabaseRequest('http://localhost:3000/api/user_food_items');
    this.dateSelectorValue = dateSelector.value;
}

FoodDatabase.prototype.bindEvents = function(){
    PubSub.subscribe('DateSelectorView:date-changed', (event) => {
        newDate = event.detail;
        this.dateSelectorValue = newDate;
        this.getExistingData();
    });
    this.getExistingData();
    PubSub.subscribe('FormView:food-submitted', (event)=>{
        console.log(event);
        const objectToSave = event.detail;
        const amendedObjectToSave = this.extractTotalDaily(objectToSave);
        // console.log(amendedObjectToSave);
        this.save(amendedObjectToSave);
    });
    PubSub.subscribe('ListView:delete-all-clicked', (event) => {
        this.deleteAll(this.dateSelectorValue);
    });
    PubSub.subscribe('ListView:delete-item-clicked', (event) => {
      const idToDelete = event.detail;
      this.delete(idToDelete, this.dateSelectorValue);
    });
}

FoodDatabase.prototype.getExistingData = function(){
  this.databaseRequest.getForDate(this.dateSelectorValue)
  .then((allData)=>{
    PubSub.publish('FormView:all-data-ready', allData);
  });
}

FoodDatabase.prototype.extractTotalDaily = function (objectToSave){
    objectToSave.details = objectToSave.details.totalDaily;
    return objectToSave; 
}

FoodDatabase.prototype.save = function(objectToSave){
   this.databaseRequest.post(objectToSave, this.dateSelectorValue)
   .then((allData)=>{
       PubSub.publish('FormView:all-data-ready', allData);
   });
}

FoodDatabase.prototype.deleteAll = function (date) {
    this.databaseRequest.deleteAll(date)
    .then((allData)=>{
        PubSub.publish('FormView:all-data-ready', allData);
      });
}

FoodDatabase.prototype.delete = function (id, date) {
  this.databaseRequest.delete(id, date)
  .then((allData)=>{
    PubSub.publish('FormView:all-data-ready', allData);
  });

}

module.exports = FoodDatabase;
