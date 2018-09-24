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
        }
    }
}

ChartView.prototype.render = function(){
    this.createTableElements();
    //this.insertDataIntoTable();
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

// ChartView.prototype.insertDataIntoTable = function(){
    // this.thTitle.textContent = "% of RDA (Recommended Dietry Allowance)";
    // this.thTitle2.textContent = "% of RDA (Recommended Dietry Allowance)";
//     this.th1.textContent = "Protein";
//     this.cell1.innerHTML = this.testData.protein;
//     this.th2.textContent = "Calcium";
//     this.cell2.innerHTML = this.testData.calcium;
//     this.th3.textContent = "Vitamin C";
//     this.cell3.innerHTML = this.testData.vitamin_c;
//     this.th4.textContent = "Fibre";
//     this.cell4.innerHTML = this.testData.fibre;
//     this.th5.textContent = "Iron";
//     this.cell5.innerHTML = this.testData.iron;
//     this.th6.textContent = "Zinc";
//     this.cell6.innerHTML = this.testData.zinc;
//     this.th7.textContent = "Potassium";
//     this.cell7.innerHTML = this.testData.potassium;
// }

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






// const PubSub = require('../helpers/pub_sub.js');

// const ChartView = function(container){
//     this.container = container;
//     this.testData = {
//         protein: {
//             name: "Protein",
//             amount: 50
//         },
//         calcium: {
//             name: "Calcium",
//             amount: 100
//         },
//         iron: {
//             name: "Iron",
//             amount: 20
//         },
//         magnesium: {
//             name: "Magnesium",
//             amount: 10
//         },
//         fat: {
//             name: "Fat",
//             amount: 60
//         }
//     }
// }

// ChartView.prototype.render = function(){
//     this.createTableElements(); 
//     this.displayChart();
// }

// ChartView.prototype.createTableElements = function(){
//     this.dataTable = document.createElement('table');
//     this.dataTable.setAttribute('id', 'datatable');
//     this.header = this.dataTable.createTHead();
//     this.body = this.dataTable.createTBody();
//     this.row0 = this.header.insertRow(0);
//     this.thTitle = document.createElement('th');
//     this.thTitle2 = document.createElement('th');
//     this.row0.appendChild(this.thTitle);
//     this.row0.appendChild(this.thTitle2);
//     let i = 0;
//     for(let element in this.testData){
//         const row = this.body.insertRow(i);
//         const th = document.createElement('th');
//         row.appendChild(th);
//         const cell = row.insertCell(1);
//         th.textContent = this.testData[element].name;
//         cell.innerHTML = this.testData[element].amount;
//         i++;
//     }
//     this.container.appendChild(this.dataTable);
// }

// ChartView.prototype.insertDataIntoTable = function(){
//     this.thTitle.textContent = "Percentage of your RDA";
//     this.thTitle2.textContent = "Percentage of your RDA";
//     this.th1.textContent = "Protein";
//     this.cell1.innerHTML = this.testData.protein;
//     this.th2.textContent = "Calcium";
//     this.cell2.innerHTML = this.testData.calcium;
//     this.th3.textContent = "vitamin C";
//     this.cell3.innerHTML = this.testData.vitamin_c;
// }

// ChartView.prototype.displayChart = function(){
//     Highcharts.chart('chart-container', {
//         data: {
//             table: 'datatable',
//             enablePolling: true
//         },
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: 'Your total daily intake'
//         },
//         yAxis: {
//             allowDecimals: false,
//             title: {
//                 text: 'Percentage of your RDA'
//             }
//         },
//         tooltip: {
//             formatter: function () {
//                 return '<b>' + this.series.name + '</b><br/>' +
//                     this.point.y + ' ' + this.point.name.toLowerCase();
//             }
//         }
//       });
// }

// module.exports = ChartView;
