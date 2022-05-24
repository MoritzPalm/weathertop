const logger = require('../utils/logger');
const stationStore = require('../models/stationstore.js');
const recordingstore = require('../models/recordingstore.js')

const station = {
    async index(request, response) {
        const stationId = request.params.id
        logger.info('Station id = ' + stationId);
        const station = await stationStore.getStation(stationId)
        const recordings = await recordingstore.getRecordingsforStation(stationId)
        const viewData = {
            title: 'Station',
            station: station,
            recordings: recordings
        };
        response.render('station', viewData);
    },
};

module.exports = station;