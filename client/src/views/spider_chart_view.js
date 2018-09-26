const PubSub = require('../helpers/pub_sub.js');

const SpiderChartView = function () {
}

SpiderChartView.prototype.bindEvents = function () {
    PubSub.subscribe("SummaryView:nutrient-object-ready", (event) => {
        const nutrientInfoObject = event.detail;
        this.data = nutrientInfoObject;
        this.displaySpiderChart();
    });
}

SpiderChartView.prototype.getNutrients = function () {
    let nutrients = [];
    for (element in this.data) {
        nutrients.push(this.data[element].name)
    }
    return nutrients;
}

SpiderChartView.prototype.getValues = function () {
    let values = [];
    for (element in this.data) {
        values.push(parseFloat(this.data[element].amount))
    }
    return values;
}

SpiderChartView.prototype.displaySpiderChart = function () {
    Highcharts.chart('spider-chart-container', {

        chart: {
            polar: true,
            type: 'area'
            // backgroundColor: 'rgba(242, 242, 242, 1)'
        },

        title: {
            text: '% of RDA (Recommended Daily Allowance)',
            x: -50
        },

        pane: {
            size: '80%'
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
                data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
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
            },]

    });
}

module.exports = SpiderChartView;

