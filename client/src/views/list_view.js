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
    nameHeading.className = "food-item-heading"
    nameHeading.textContent = `${dataItem.name}: ${dataItem.amount} ${dataItem.measurement}`;
    div.appendChild(nameHeading);

    const deleteButton = document.createElement('button');
    deleteButton.className = "item-delete-button";
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      PubSub.publish('ListView:delete-item-clicked', dataItem._id)
    })
    div.appendChild(deleteButton);

    const expandButton = document.createElement('button');
    expandButton.className = "item-expand-button"
    expandButton.textContent = 'RDA %s';
    div.appendChild(expandButton);

    const unorderedList = document.createElement('ul');
    unorderedList.className = "item-details-list";
    unorderedList.style.display = 'none';

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

    expandButton.addEventListener('click', () => {
        if (unorderedList.style.display === 'none') {
            unorderedList.style.display = 'block';
        } else if (unorderedList.style.display === 'block') {
            unorderedList.style.display = 'none';
        }
    })
}



module.exports = ListView;
