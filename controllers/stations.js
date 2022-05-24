const logger = require('../utils/logger');
const stationStore = require('../models/stationstore.js');

const station = {
    index(request, response) {
        const viewData = {
            title: 'Station',
        };
        response.render('station', viewData);
    },
};

module.exports = station;