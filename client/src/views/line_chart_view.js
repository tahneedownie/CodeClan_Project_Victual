const PubSub = require('../helpers/pub_sub.js');
const moment = require('moment');
const DatabaseRequest = require('../helpers/database_request.js');

const LineChartView = function(options, container){
this.options = options;
this.container = container;

this.allPotentialMinerals = {
    "CA": "Calcium",
    "CHOCDF": "Carbs",
    "CHOLE": "Cholesterol",
    "ENERC_KCAL": "Energy",
    "FASAT": "Sugars",
    "FAT": "Fat",
    "FE": "Iron",
    "FIBTG": "Fibre",
    "FOLDFE": "Folic Acid",
    "K": "Potassium",
    "MG": "Magnesium",
    "NA": "Sodium",
    "NIA": "Niacin (B3)",
    "P": "Phosphorus",
    "PROCNT": "Protein",
    "RIBF": "Riboflavin (B2)",
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
this.weeklyDataObject = {};
}

LineChartView.prototype.bindEvents = function(){
this.options.addEventListener('change', (event)=>{
    this.nutrientToDisplay = event.target.value;
    const databaseRequest = new DatabaseRequest('http://localhost:3000/api/user_food_items');

    var today = moment().format('YYYY-MM-DD');
    var yesterday = moment().subtract(1, "days").format('YYYY-MM-DD');
    var twoDaysAgo = moment().subtract(2, "days").format('YYYY-MM-DD');
    var threeDaysAgo = moment().subtract(3, "days").format('YYYY-MM-DD');
    var fourDaysAgo = moment().subtract(4, "days").format('YYYY-MM-DD');
    var fiveDaysAgo = moment().subtract(5, "days").format('YYYY-MM-DD');
    var sixDaysAgo = moment().subtract(6, "days").format('YYYY-MM-DD');
    
    let mineralKey = "";
    for(let mineral in this.allPotentialMinerals){
        if (this.allPotentialMinerals[mineral] === this.nutrientToDisplay){
            mineralKey = mineral;
        };
    }

    databaseRequest.getForDate(today)
        .then((singleDaysData)=>{
            this.weeklyDataObject[today] = this.calculateTotal(singleDaysData, mineralKey);
    })
    .then(()=>{
        databaseRequest.getForDate(yesterday)
        .then((singleDaysData)=>{
            this.weeklyDataObject[yesterday] = this.calculateTotal(singleDaysData, mineralKey);
    })})
    .then(()=>{
            databaseRequest.getForDate(twoDaysAgo)
        .then((singleDaysData)=>{
            this.weeklyDataObject[twoDaysAgo] = this.calculateTotal(singleDaysData, mineralKey);
    })})
    .then(()=>{
            databaseRequest.getForDate(threeDaysAgo)
        .then((singleDaysData)=>{
                this.weeklyDataObject[threeDaysAgo] = this.calculateTotal(singleDaysData, mineralKey);
    })})
    .then(()=>{
        databaseRequest.getForDate(fourDaysAgo)
        .then((singleDaysData)=>{
            this.weeklyDataObject[fourDaysAgo] = this.calculateTotal(singleDaysData, mineralKey);
    })})
    .then(()=>{
        databaseRequest.getForDate(fiveDaysAgo)
        .then((singleDaysData)=>{
            this.weeklyDataObject[fiveDaysAgo] = this.calculateTotal(singleDaysData, mineralKey);
    })})
    .then(()=>{
        databaseRequest.getForDate(sixDaysAgo)
        .then((singleDaysData)=>{
            this.weeklyDataObject[sixDaysAgo] = this.calculateTotal(singleDaysData, mineralKey);
            this.render();
    })})
    .then(()=>{
        this.render();
    });
})}

LineChartView.prototype.calculateTotal = function (allData, mineral) {
let totalPercentage = 0;
for (const dataItem of allData ) {
    if (dataItem.details[mineral]) {
        const amountOfUnits = dataItem.amount;
        totalPercentage += (dataItem.details[mineral].quantity * amountOfUnits);
    }
}
return totalPercentage.toFixed(2);
}

LineChartView.prototype.render = function(){
this.container.innerHTML = "";
this.createTableElements();
this.displayChart();
}

LineChartView.prototype.createTableElements = function(){
this.dataTable = document.createElement('table');
this.dataTable.setAttribute('id', 'datatable');
this.header = this.dataTable.createTHead();
this.body = this.dataTable.createTBody();
this.row0 = this.header.insertRow(0);
this.thDate = document.createElement('th');
this.thNutrient = document.createElement('th');
this.thDate.textContent = "Date";
this.thNutrient.textContent = this.nutrientToDisplay;
this.row0.appendChild(this.thDate);
this.row0.appendChild(this.thNutrient);
this.createRows();
this.container.appendChild(this.dataTable);
}

LineChartView.prototype.createRows = function(){
let i = 0;
for(let element in this.weeklyDataObject){
    const row = this.body.insertRow(i);
    const th = document.createElement('th');
    th.textContent = element;
    row.appendChild(th);
    const cell = row.insertCell(1);
    cell.innerHTML = this.weeklyDataObject[element];
    i++;
}
}


LineChartView.prototype.displayChart = function(){
Highcharts.chart('line-chart-container', {
    data: {
        table: 'datatable',
        enablePolling: true
    },
    chart: {
        type: 'line'
    },
    title: {
        text: 'Your total daily intake'
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: ' '
        },
        min: 0,
        max: 200
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.point.y + ' ' + this.point.name.toLowerCase();
        }
    },
    plotOptions: {
        series: {
            color: "#8EC63F"
        }
    }
    });
}

module.exports = LineChartView;
