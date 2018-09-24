const PubSub = require('../helpers/pub_sub.js');

const ChartView = function(container){
    this.container = container;
    this.testData = {
        protein: {
            name: "Protein",
            amount: 50
        },
        calcium: {
            name: "Calcium",
            amount: 15
        },
        vitamin_c: {
            name: "Vitamin C",
            amount: 35
        },
        fibre: {
            name: "Fibre",
            amount: 100
        },
        iron: {
            name: "Iron",
            amount: 57
        },
        zinc: {
            name: "Zinc",
            amount: 6
        },
        potassium: {
            name: "Potassium",
            amount: 2
        },
        vitamin_b: {
            name: "Vitamin B",
            amount: 33
        },
        vitamin_d: {
            name: "Vitamin D",
            amount: 54
        }

    }
}

ChartView.prototype.render = function(){
    this.createTableElements();
    this.displayChart();
}

ChartView.prototype.createTableElements = function(){
    this.dataTable = document.createElement('table');
    this.dataTable.setAttribute('id', 'datatable');
    this.header = this.dataTable.createTHead();
    this.body = this.dataTable.createTBody();
    this.row0 = this.header.insertRow(0);
    this.thTitle = document.createElement('th');
    this.thTitle2 = document.createElement('th');
    this.thTitle.textContent = "% of RDA (Recommended Dietary Allowance)";
    this.thTitle2.textContent = "% of RDA (Recommended Dietary Allowance)";
    this.row0.appendChild(this.thTitle);
    this.row0.appendChild(this.thTitle2);
    this.createRows();
    this.container.appendChild(this.dataTable);
}

ChartView.prototype.createRows = function(){
    let i = 0;
    for(let element in this.testData){
        const row = this.body.insertRow(i);
        const th = document.createElement('th');
        row.appendChild(th);
        const cell = row.insertCell(1);
        th.textContent = this.testData[element].name;
        cell.innerHTML = this.testData[element].amount;
        i++;
    }
}


ChartView.prototype.displayChart = function(){
    Highcharts.chart('chart-container', {
        data: {
            table: 'datatable',
            enablePolling: true
        },
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Your total daily intake'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' ' + this.point.name.toLowerCase();
            }
        }
      });
}

module.exports = ChartView;
