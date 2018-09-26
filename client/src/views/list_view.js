const PubSub = require('../helpers/pub_sub.js');

const ListView = function (listContainer, deleteAllButton) {
    this.listContainer = listContainer;
    this.deleteAllButton = deleteAllButton;
}

ListView.prototype.bindEvents = function () {
    PubSub.subscribe('FoodDatabase:all-data-ready', (event) => {
        this.listContainer.innerHTML = "<h2>FOOD DIARY</h2>";
        this.renderAll(event.detail);
    });

    this.deleteAllButton.addEventListener('click', (event) => {
        PubSub.publish('ListView:delete-all-clicked', null)
    });
}

ListView.prototype.renderAll = function (allData) {
    allData.forEach((dataItem) => {
        this.renderOne(dataItem);
    });
}

ListView.prototype.renderOne = function (dataItem) {

    const div = document.createElement('div');
    div.className = "food-item";

    const nameHeading = this.createHeading(dataItem);
    div.appendChild(nameHeading);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'food-item-button-container';

    const deleteButton = this.createDeleteButton(dataItem);
    buttonContainer.appendChild(deleteButton);

    const expandButton = this.createExpandButton();
    buttonContainer.appendChild(expandButton);

    div.appendChild(buttonContainer);

    const nutrientList = this.createUnorderedList();
    this.generateNutrientDetails(nutrientList, dataItem);
    div.appendChild(nutrientList);

    this.makeDetailsExpandable(expandButton, nutrientList);

    this.listContainer.appendChild(div);

}

ListView.prototype.createHeading = function (dataItem) {
    const nameHeading = document.createElement('h3');
    nameHeading.className = "food-item-heading"
    nameHeading.textContent = `${dataItem.name}: ${dataItem.amount} ${dataItem.measurement}`;
    return nameHeading;
}

ListView.prototype.createDeleteButton = function (dataItem) {
    const deleteButton = document.createElement('button');
    deleteButton.className = "item-delete-button";
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        PubSub.publish('ListView:delete-item-clicked', dataItem._id)
    })
    return deleteButton;
}

ListView.prototype.createExpandButton = function () {
    const expandButton = document.createElement('button');
    expandButton.className = "item-expand-button"
    expandButton.textContent = 'RDA %s';
    return expandButton;
}

ListView.prototype.makeDetailsExpandable = function (button, unorderedList) {
    button.addEventListener('click', () => {
        if (unorderedList.style.display === 'none') {
            unorderedList.style.display = 'block';
        } else if (unorderedList.style.display === 'block') {
            unorderedList.style.display = 'none';
        }
    })
}

ListView.prototype.createUnorderedList = function () {
    const unorderedList = document.createElement('ul');
    unorderedList.className = "item-details-list";
    unorderedList.style.display = 'none';
    return unorderedList;
}

ListView.prototype.generateNutrientDetails = function (unorderedList, dataItem) {
    const amountOfUnits = parseFloat(dataItem.amount);
    const listItemTextArray = [];

    for (let nutritionDetailKey of Object.keys(dataItem.details)) {

        const nutrientObject = dataItem.details[nutritionDetailKey];
        const totalPercentage = (amountOfUnits * parseFloat(nutrientObject.quantity));
        const listItemText = `${nutrientObject.label}: ${totalPercentage.toFixed(2)}%`;
        listItemTextArray.push(listItemText);
    }

    listItemTextArray.sort();

    listItemTextArray.forEach((listItemText) => {
        const listItem = document.createElement('li');
        listItem.textContent = listItemText;
        unorderedList.appendChild(listItem);
    })
}







module.exports = ListView;
