const FormView = require('./views/form_view.js');
const ListView = require('./views/list_view.js');
const ChartView = require('./views/chart_view.js');
const LineChartView = require('./views/line_chart_view.js');
const SummaryView = require('./views/summary_view.js');
const Food = require('./models/food.js');



const DateSelectorView = require('./views/date_selector_view.js');

//const dotenv = require('dotenv').config();
const RecipeRequest = require('./helpers/recipe_request.js');
const RecipeView = require('./views/recipe_view.js');

document.addEventListener('DOMContentLoaded', ()=>{

    const dateSelector = document.querySelector('#date-selector');
    const dateSelectorView = new DateSelectorView(dateSelector);
    dateSelectorView.bindEvents();

    console.log(dateSelector);

    const listDiv = document.querySelector('#food-list');
    const deleteAllButton = document.querySelector('#delete-all-button');
    const listView = new ListView(listDiv, deleteAllButton);
    listView.bindEvents();

    const form = document.querySelector('#food-form');
    const formView = new FormView(form, dateSelector);
    formView.bindEvents();

    const recipesContainer = document.querySelector('#recipes-container');
    const recipeView = new RecipeView(recipesContainer);
    recipeView.bindEvents();

    const lineChartContainer = document.querySelector('#line-chart-container');
    const lineChartOptions = document.querySelector('#line-chart-options');
    const lineChartView = new LineChartView(lineChartOptions, lineChartContainer);
    lineChartView.bindEvents();

    const summaryDiv = document.querySelector('#summary-container');
    const summaryView = new SummaryView(summaryDiv, lineChartView);
    summaryView.bindEvents();

    const food = new Food(dateSelector);
    food.bindEvents();

    const chartContainer = document.querySelector('#chart-container');
    const chartView = new ChartView(chartContainer);
    chartView.bindEvents();



});
