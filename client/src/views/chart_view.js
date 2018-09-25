const PubSub = require('../helpers/pub_sub.js');

const ChartView = function(container){
    this.container = container;
}

ChartView.prototype.bindEvents = function(){
    PubSub.subscribe("SummaryView:nutrient-object-ready", (event)=>{
        const nutrientInfoObject = event.detail;
        this.data = nutrientInfoObject;
        this.render();
    });
}

ChartView.prototype.render = function(){
    this.createTableElements();
    this.displayChart();
    this.displaySpiderChart();
}

ChartView.prototype.createTableElements = function(){
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

ChartView.prototype.createRows = function(){
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
                color: "#8EC63F"
            }
        }
      });
}




///////////////////////////////////////////////////////




ChartView.prototype.getNutrients = function () {
    let nutrients = [];
    for (element in this.data) {
        nutrients.push(this.data[element].name)
    }
    return nutrients;
}

ChartView.prototype.getValues = function () {
    let values = [];
    for (element in this.data) {
        values.push(parseFloat(this.data[element].amount))
    }
    console.log(values);
    return values;
    
}

ChartView.prototype.displaySpiderChart = function () {
    Highcharts.chart('spider-chart-container', {

        chart: {
            polar: true,
            type: 'area'
        },
    
        title: {
            text: '% of RDA (Recommended Daily Allowance)',
            x: -50
        },
    
        pane: {
            size: '75%'
        },
    
        xAxis: {
            categories: this.getNutrients(),
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
    
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 250
        },
    
        tooltip: {
            // shared: true,
            // pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
    
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
    
        series: [
            {
                name: 'RDA',
                data: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100],
                pointPlacement: 'on',
                color: '#D3D3D3'  
            }, 
            
            {
            name: '% of RDA',
            data: this.getValues(),
            pointPlacement: 'on',
            color: '#8EC63F',
            fillColor: '#8EC63F',
            fillOpacity: 0.9
        }, ]
    
    });
}

module.exports = ChartView;

