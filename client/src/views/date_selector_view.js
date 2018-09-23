const moment = require('moment');
const PubSub = require('../helpers/pub_sub.js');

const DateSelectorView = function (dateSelector) {
    this.dateSelector = dateSelector;
}

DateSelectorView.prototype.bindEvents = function () {
    this.setDefaultDateToday();

    this.dateSelector.addEventListener('change', () => {
        PubSub.publish('DateSelectorView:date-changed', this.dateSelector.value);
    })
}

DateSelectorView.prototype.setDefaultDateToday = function () {
    var today = moment().format('YYYY-MM-DD');
    this.dateSelector.value = today;
}

module.exports = DateSelectorView;