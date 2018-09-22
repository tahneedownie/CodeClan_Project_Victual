const PubSub = require('../helpers/pub_sub.js');

const ChartView = function(container){
    this.container = container;
    this.testData = {
        protein: "50",
        calcium: "15",
        vitamin_c: "35",
        fibre: "57",
        iron: "10",
        zinc: "6",
        potassium: "2"
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
    this.row5 = this.body.insertRow(3);
    this.row6 = this.body.insertRow(4);
    this.row7 = this.body.insertRow(5);
    this.row8 = this.body.insertRow(6);
    this.thTitle = document.createElement('th');
    this.thTitle2 = document.createElement('th');
    this.th1 = document.createElement('th');
    this.th2 = document.createElement('th');
    this.th3 = document.createElement('th');
    this.th4 = document.createElement('th');
    this.th5 = document.createElement('th');
    this.th6 = document.createElement('th');
    this.th7 = document.createElement('th');
    this.row1.appendChild(this.thTitle);
    this.row1.appendChild(this.thTitle2);
    this.row2.appendChild(this.th1);
    this.row3.appendChild(this.th2);
    this.row4.appendChild(this.th3);
    this.row5.appendChild(this.th4);
    this.row6.appendChild(this.th5);
    this.row7.appendChild(this.th6);
    this.row8.appendChild(this.th7);
    this.cell1 = this.row2.insertCell(1);
    this.cell2 = this.row3.insertCell(1);
    this.cell3 = this.row4.insertCell(1);
    this.cell4 = this.row5.insertCell(1);
    this.cell5 = this.row6.insertCell(1);
    this.cell6 = this.row7.insertCell(1);
    this.cell7 = this.row8.insertCell(1);
    this.container.appendChild(this.dataTable);
}

ChartView.prototype.insertDataIntoTable = function(){
    this.thTitle.textContent = "Percentage of your RDA";
    this.thTitle2.textContent = "Percentage of your RDA";
    this.th1.textContent = "Protein";
    this.cell1.innerHTML = this.testData.protein;
    this.th2.textContent = "Calcium";
    this.cell2.innerHTML = this.testData.calcium;
    this.th3.textContent = "Vitamin C";
    this.cell3.innerHTML = this.testData.vitamin_c;
    this.th4.textContent = "Fibre";
    this.cell4.innerHTML = this.testData.fibre;
    this.th5.textContent = "Iron";
    this.cell5.innerHTML = this.testData.iron;
    this.th6.textContent = "Zinc";
    this.cell6.innerHTML = this.testData.zinc;
    this.th7.textContent = "Potassium";
    this.cell7.innerHTML = this.testData.potassium;
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
