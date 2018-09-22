const PubSub = require('../helpers/pub_sub.js');

const ChartView = function(container){
    this.container = container;
    this.testData = {
        protein: "50",
        calcium: "15",
        vitamin_c: "35"
    }
}

ChartView.prototype.render = function(){
    this.createTableElements(); 
    this.insertDataIntoTable();
    this.displayChart();
}

ChartView.prototype.createTableElements = function(){
    this.dataTable = document.createElement('table');
    this.dataTable.setAttribute('id', 'datatable');
    this.header = this.dataTable.createTHead();
    this.body = this.dataTable.createTBody();
    this.row1 = this.header.insertRow(0);
    this.row2 = this.body.insertRow(0);
    this.row3 = this.body.insertRow(1);
    this.row4 = this.body.insertRow(2);
    this.thTitle = document.createElement('th');
    this.thTitle2 = document.createElement('th');
    this.th1 = document.createElement('th');
    this.th2 = document.createElement('th');
    this.th3 = document.createElement('th');
    this.row1.appendChild(this.thTitle);
    this.row1.appendChild(this.thTitle2);
    this.row2.appendChild(this.th1);
    this.row3.appendChild(this.th2);
    this.row4.appendChild(this.th3);
    this.cell1 = this.row2.insertCell(1);
    this.cell2 = this.row3.insertCell(1);
    this.cell3 = this.row4.insertCell(1);
    this.container.appendChild(this.dataTable);
}

ChartView.prototype.insertDataIntoTable = function(){
    this.thTitle.textContent = "Percentage of your RDA";
    this.thTitle2.textContent = "Percentage of your RDA";
    this.th1.textContent = "Protein";
    this.cell1.innerHTML = this.testData.protein;
    this.th2.textContent = "Calcium";
    this.cell2.innerHTML = this.testData.calcium;
    this.th3.textContent = "vitamin C";
    this.cell3.innerHTML = this.testData.vitamin_c;
}

ChartView.prototype.displayChart = function(){
    Highcharts.chart('chart-container', {
        data: {
            table: 'datatable',
            enablePolling: true
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Your total daily intake'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Percentage of your RDA'
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