const PubSub = require('../helpers/pub_sub.js');

const ListView = function(listContainer, deleteAllButton){
    this.listContainer = listContainer;
    this.deleteAllButton = deleteAllButton;
}

ListView.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:all-data-ready', (event)=>{
        console.log(event.detail);
        this.listContainer.innerHTML = "";
        this.renderAll(event.detail);
    });
    
    this.deleteAllButton.addEventListener('click', (event) => {
        PubSub.publish('ListView:delete-all-clicked', null)
    });
}

ListView.prototype.renderAll = function(allData){
    allData.forEach((dataItem)=>{
        this.renderOne(dataItem);
    });
}

ListView.prototype.renderOne = function(dataItem){
    const numberOfGrams = parseFloat(dataItem.grams);
    const div = document.createElement('div');
    div.className = "food-item";
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = `${dataItem.name}: ${dataItem.grams} grams`;
    div.appendChild(nameHeading);
    const unorderedList = document.createElement('ul');

    for(let nutritionDetailKey of Object.keys(dataItem.details.totalDaily)){
       //console.log(dataItem.details.totalDaily[nutritionDetailKey]);
       const nutrientObject = dataItem.details.totalDaily[nutritionDetailKey];
       const totalPercentage = (numberOfGrams * parseFloat(nutrientObject.quantity));
       
       const listLabel = document.createElement('li');
       listLabel.textContent = `${nutrientObject.label}: ${totalPercentage}%`;
       unorderedList.appendChild(listLabel);


        // for(let nutritionDetail in dataItem.details.totalNutrients[]){
        //     console.log(nutritionDetail);
            // const listItem = document.createElement('li');
            // console.log(nutritionDetail);
            // listItem.textContent = nutritionDetails.label;
            // unorderedList.appendChild(listItem);
       // }
    }


    div.appendChild(unorderedList);
    this.listContainer.appendChild(div);
}

    

module.exports = ListView;