const PubSub = require('../helpers/pub_sub.js');

const SummaryView = function (summaryContainer) {
    this.summaryContainer = summaryContainer;
    this.allPotentialMinerals = {
        "CA": "Calcium",
        "CHOCDF": "Carbs",
        "CHOLE": "Cholesterol",
        "ENERC_KCAL": "Energy",
        "FAMS": "Monounsaturated",
        "FAPU": "Polyunsaturated",
        "FASAT": "Sugars",
        "FAT": "Fat",
        "FATRN": "Trans",
        "FE": "Iron",
        "FIBTG": "Fiber",
        "FOLDFE": "Folate (Equivalent)",
        "K": "Potassium",
        "MG": "Magnesium",
        "NA": "Sodium",
        "NIA": "Niacin (B3)",
        "P": "Phosphorus",
        "PROCNT": "Protein",
        "RIBF": "Riboflavin (B2)",
        "SUGAR": "Sugars",
        "THIA": "Thiamin (B1)",
        "TOCPHA": "Vitamin E",
        "VITA_RAE": "Vitamin A",
        "VITB12": "Vitamin B12",
        "VITB6A": "Vitamin B6",
        "VITC": "Vitamin C",
        "VITD": "Vitamin D",
        "VITK1": "Vitamin K",
        "ZN": "Zinc"
    }

}

SummaryView.prototype.bindEvents = function () {
    PubSub.subscribe('FormView:all-data-ready', (event) => {
        const allData = event.detail;
        console.log(allData);
        this.summaryContainer.innerHTML = ""
        this.renderSummary(allData);
    })
}

SummaryView.prototype.renderSummary = function (allData) {
    const summaryHeading = document.createElement('h2');
    summaryHeading.textContent = 'Your Daily Summary'
    const unorderedList = document.createElement('ul');
    const nutrientInfoObject = {};
    for (const mineral in this.allPotentialMinerals) {
        const listItem = document.createElement('li');
        listItem.textContent = `${this.allPotentialMinerals[mineral]}: ${this.calculateTotal(allData, mineral)}%`
        unorderedList.appendChild(listItem);
        nutrientInfoObject[mineral] = {
            name: this.allPotentialMinerals[mineral],
            amount: this.calculateTotal(allData, mineral)
        };
    };
    this.summaryContainer.appendChild(summaryHeading);
    this.summaryContainer.appendChild(unorderedList);
    this.publishNutrientObject(nutrientInfoObject);
}

SummaryView.prototype.publishNutrientObject = function(nutrientInfoObject){
    PubSub.publish("SummaryView:nutrient-object-ready", nutrientInfoObject);
}

SummaryView.prototype.calculateTotal = function (allData, mineral) {
    let totalPercentage = 0;
    for (const dataItem of allData ) {
        if (dataItem.details[mineral]) {
            const amountOfUnits = dataItem.amount;
            totalPercentage += (dataItem.details[mineral].quantity * amountOfUnits);
        }
    }
    return totalPercentage.toFixed(2);
}

module.exports = SummaryView;
