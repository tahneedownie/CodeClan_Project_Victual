const FormView = require('./views/form_view.js');
const ListView = require('./views/list_view.js');
const BarChartView = require('./views/bar_chart_view.js');
const SpiderChartView = require('./views/spider_chart_view.js');
const LineChartView = require('./views/line_chart_view.js');
const SummaryView = require('./views/summary_view.js');
const FoodDatabase = require('./models/food_database.js');

const DateSelectorView = require('./views/date_selector_view.js');
// const RecipeAPIRequest = require('./helpers/recipe_API_request.js');
const RecipeView = require('./views/recipe_view.js');

const FoodAPI = require('./models/food_API.js');

document.addEventListener('DOMContentLoaded', () => {

    const dateSelector = document.querySelector('#date-selector');
    const dateSelectorView = new DateSelectorView(dateSelector);
    dateSelectorView.bindEvents();

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

    const foodDatabase = new FoodDatabase(dateSelector);
    foodDatabase.bindEvents();

    const chartContainer = document.querySelector('#chart-container');
    const barChartView = new BarChartView(chartContainer);
    barChartView.bindEvents();

    // const spiderChartContainer = document.querySelector('#spider-chart-container');
    const spiderChartView = new SpiderChartView();
    spiderChartView.bindEvents();

    const foodAPI = new FoodAPI();
    foodAPI.bindEvents();

});
