const FormView = require('./views/form_view.js');
const ListView = require('./views/list_view.js');
const Food = require('./models/food.js');
//const dotenv = require('dotenv').config();

document.addEventListener('DOMContentLoaded', ()=>{

    const listDiv = document.querySelector('#food-list');
    const listView = new ListView(listDiv);
    listView.bindEvents();

    const form = document.querySelector('#food-form');
    const formView = new FormView(form);
    formView.bindEvents();

    const food = new Food();
    food.bindEvents();
});