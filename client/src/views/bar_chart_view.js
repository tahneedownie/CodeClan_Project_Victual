const PubSub = require('../helpers/pub_sub.js');

const BarChartView = function(container){
    this.container = container;
}

BarChartView.prototype.bindEvents = function(){
    PubSub.subscribe("SummaryView:nutrient-object-ready", (event)=>{
        const nutrientInfoObject = event.detail;
        this.data = nutrientInfoObject;
        this.render();
    });
}

BarChartView.prototype.render = function(){
    this.createTableElements();
    this.displayChart();
}

BarChartView.prototype.createTableElements = function(){
    this.dataTable = document.createElement('table');
    this.dataTable.setAttribute('id', 'datatable');
    this.header = this.dataTable.createTHead();
    this.body = this.dataTable.createTBody();
    this.row0 = this.header.insertRow(0);
    this.thTitle = document.createElement('th');
    this.thTitle2 = document.createElement('th');
    this.thTitle.textContent = "% of RDA (Recommended Daily Allowance)";
    this.thTitle2.textContent = "% of RDA (Recommended Daily Allowance)";
    this.row0.appendChild(this.thTitle);
    this.row0.appendChild(this.thTitle2);
    this.createRows();
    this.container.appendChild(this.dataTable);
}

BarChartView.prototype.createRows = function(){
    let i = 0;
    for(let element in this.data){
        const row = this.body.insertRow(i);
        const th = document.createElement('th');
        row.appendChild(th);
        const cell = row.insertCell(1);
        th.textContent = this.data[element].name;
        cell.innerHTML = this.data[element].amount;
        i++;
    }
}

BarChartView.prototype.displayChart = function(){
    Highcharts.chart('chart-container', {
        data: {
            table: 'datatable',
            enablePolling: true
        },
        chart: {
            type: 'bar'
            // backgroundColor: 'rgba(242, 242, 242, 1)'
        },
        title: {
            text: 'Your Total Daily Intake'
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
                color: "#8EC63F",
            }
        }
      });
}

module.exports = BarChartView;

