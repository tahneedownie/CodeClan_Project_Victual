const PubSub = require('../helpers/pub_sub.js');
const DatabaseRequest = require('../helpers/database_request.js');

const Food = function(dateSelector){
    this.databaseRequest = new DatabaseRequest('http://localhost:3000/api/user_food_items');
    this.dateSelectorValue = dateSelector.value;
}

Food.prototype.bindEvents = function(){
    PubSub.subscribe('DateSelectorView:date-changed', (event) => {
        newDate = event.detail;
        this.dateSelectorValue = newDate;
        this.getExistingData();
    });
    this.getExistingData();
    PubSub.subscribe('FormView:food-submitted', (event)=>{
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

Food.prototype.getExistingData = function(){
  this.databaseRequest.getForDate(this.dateSelectorValue)
  .then((allData)=>{
    PubSub.publish('FormView:all-data-ready', allData);
  });
}

Food.prototype.extractTotalDaily = function (objectToSave){
    objectToSave.details = objectToSave.details.totalDaily;
    return objectToSave; 
}

Food.prototype.save = function(objectToSave){
   this.databaseRequest.post(objectToSave, this.dateSelectorValue)
   .then((allData)=>{
       PubSub.publish('FormView:all-data-ready', allData);
   });
}

Food.prototype.deleteAll = function (date) {
    this.databaseRequest.deleteAll(date)
    .then((allData)=>{
        PubSub.publish('FormView:all-data-ready', allData);
      });
}

Food.prototype.delete = function (id, date) {
  this.databaseRequest.delete(id, date)
  .then((allData)=>{
    PubSub.publish('FormView:all-data-ready', allData);
  });

}

module.exports = Food;
