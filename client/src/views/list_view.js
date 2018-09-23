const PubSub = require('../helpers/pub_sub.js');

const ListView = function(listContainer, deleteAllButton){
    this.listContainer = listContainer;
    this.deleteAllButton = deleteAllButton;
}

ListView.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:all-data-ready', (event)=>{
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
    const amountOfUnits = parseFloat(dataItem.amount);
    const div = document.createElement('div');
    div.className = "food-item";
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = `${dataItem.name}: ${dataItem.amount} ${dataItem.measurement}`;
    div.appendChild(nameHeading);


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      PubSub.publish('ListView:delete-item-clicked', dataItem._id)
    })
    div.appendChild(deleteButton);



    const unorderedList = document.createElement('ul');

    for(let nutritionDetailKey of Object.keys(dataItem.details)){
       //console.log(dataItem.details[nutritionDetailKey]);
       const nutrientObject = dataItem.details[nutritionDetailKey];
       const totalPercentage = (amountOfUnits * parseFloat(nutrientObject.quantity));

       const listLabel = document.createElement('li');
       listLabel.textContent = `${nutrientObject.label}: ${totalPercentage.toFixed(2)}%`;
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
