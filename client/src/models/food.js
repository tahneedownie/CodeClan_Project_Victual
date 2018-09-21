const PubSub = require('../helpers/pub_sub.js');

const Food = function(){

}

Food.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:food-submitted', (event)=>{
        const objectToSave = event.detail;
        this.save(objectToSave);
    });
}

Food.prototype.save = function(objectToSave){
    console.log(objectToSave)
}

module.exports = Food;