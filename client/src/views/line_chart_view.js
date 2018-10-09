const PubSub = require('../helpers/pub_sub.js');
const moment = require('moment');
const DatabaseRequest = require('../helpers/database_request.js');
const AllMinerals = require('../models/all_minerals.js');

const LineChartView = function (options, container) {
    this.options = options;
    this.container = container;
    this.allPotentialMinerals = AllMinerals.allPotentialMinerals;
}

LineChartView.prototype.bindEvents = function () {
    this.options.addEventListener('change', (event) => {
        this.nutrientToDisplay = event.target.value;
        this.createGraph(this.nutrientToDisplay);
    })
}

LineChartView.prototype.createGraph = function (nutrientToDisplay) {
    this.nutrientToDisplay = nutrientToDisplay;
    // const databaseRequest = new DatabaseRequest('http://localhost:3000/api/user_food_items');
    const databaseRequest = new DatabaseRequest('https://victual-nutrition-app.herokuapp.com/api/user_food_items');

    var today = moment().format('YYYY-MM-DD');
    var yesterday = moment().subtract(1, "days").format('YYYY-MM-DD');
    var twoDaysAgo = moment().subtract(2, "days").format('YYYY-MM-DD');
    var threeDaysAgo = moment().subtract(3, "days").format('YYYY-MM-DD');
    var fourDaysAgo = moment().subtract(4, "days").format('YYYY-MM-DD');
    var fiveDaysAgo = moment().subtract(5, "days").format('YYYY-MM-DD');
    var sixDaysAgo = moment().subtract(6, "days").format('YYYY-MM-DD');

    this.datesData = [sixDaysAgo, fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday, today];

    let mineralKey = "";
    for (let mineral in this.allPotentialMinerals) {
        if (this.allPotentialMinerals[mineral] === this.nutrientToDisplay) {
            mineralKey = mineral;
        };
    }
    this.RDAData = [];

    databaseRequest.getForDate(today)
        .then((singleDaysData) => {
            this.RDAData.push(parseFloat(this.calculateTotal(singleDaysData, mineralKey)));
        })
        .then(() => {
            databaseRequest.getForDate(yesterday)
                .then((singleDaysData) => {
                    this.RDAData.push(parseFloat(this.calculateTotal(singleDaysData, mineralKey)));
                })
                .then(() => {
                    databaseRequest.getForDate(twoDaysAgo)
                        .then((singleDaysData) => {
                            this.RDAData.push(parseFloat(this.calculateTotal(singleDaysData, mineralKey)));
                        })
                        .then(() => {
                            databaseRequest.getForDate(threeDaysAgo)
                                .then((singleDaysData) => {
                                    this.RDAData.push(parseFloat(this.calculateTotal(singleDaysData, mineralKey)));
                                })
                                .then(() => {
                                    databaseRequest.getForDate(fourDaysAgo)
                                        .then((singleDaysData) => {
                                            this.RDAData.push(parseFloat(this.calculateTotal(singleDaysData, mineralKey)));
                                        })
                                        .then(() => {
                                            databaseRequest.getForDate(fiveDaysAgo)
                                                .then((singleDaysData) => {
                                                    this.RDAData.push(parseFloat(this.calculateTotal(singleDaysData, mineralKey)));
                                                })
                                                .then(() => {
                                                    databaseRequest.getForDate(sixDaysAgo)
                                                        .then((singleDaysData) => {
                                                            this.RDAData.push(parseFloat(this.calculateTotal(singleDaysData, mineralKey)));
                                                            this.RDAData.reverse();
                                                            this.render();
                                                        })
                                                })
                                        })
                                })
                        })
                })
        });
}

LineChartView.prototype.calculateTotal = function (allData, mineral) {
    let totalPercentage = 0;
    for (const dataItem of allData) {
        if (dataItem.details[mineral]) {
            const amountOfUnits = dataItem.amount;
            totalPercentage += (dataItem.details[mineral].quantity * amountOfUnits);
        }
    }
    return totalPercentage.toFixed(2);
}

LineChartView.prototype.render = function () {
    this.container.innerHTML = "";
    this.displayChart();
}

LineChartView.prototype.displayChart = function () {
    Highcharts.chart('line-chart-container', {
        xAxis: {
            categories: this.datesData,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        series: [{
            name: '% of RDA',
            data: this.RDAData,
            pointPlacement: 'on'
        }],

        chart: {
            type: 'line'
            // backgroundColor: 'rgba(242, 242, 242, 1)'
        },
        title: {
            text: `Weekly ${this.nutrientToDisplay}`
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: ' '
            },
            min: 0
        },
        plotOptions: {
            series: {
                color: "#8EC63F"
            }
        }
    });
}

module.exports = LineChartView;
