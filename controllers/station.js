const logger = require('../utils/logger');
const stationStore = require('../models/stationstore.js');
const recordingstore = require('../models/recordingstore.js')
const weatherformat = require("../utils/weatherformatter");

const station = {
    async index(request, response) {
        const stationId = request.params.id
        logger.info('Station id = ' + stationId);
        const station = await stationStore.getStation(stationId)
        const recordings = await recordingstore.getRecordingsforStation(stationId)
        const currRecording = await recordingstore.getLatestRecordingsforStation(stationId)
        let weathertext = 0
        let winddirection = 0
        let weathericon = 0
        if (currRecording[0] !== undefined) {
            weathertext = weatherformat.code_to_text(currRecording[0].weather)
            winddirection = weatherformat.degree_to_direction(currRecording[0].winddirection)
            weathericon = weatherformat.weathercode_to_icon(currRecording[0].weather)
        } else {
            weathertext = 'not found'
            winddirection = 'not found'
            weathericon = 'error'
        }
        const viewData = {
            title: 'Station',
            station: station,
            currRecording: currRecording[0],
            recordings: recordings,
            weathertext: weathertext,
            winddirection: winddirection,
            weathericon: weathericon
        };
        response.render('station', viewData);
    },
    async deleteRecording(request, response) {
        logger.info("delete recording reached");
        const stationId = request.params.id;
        const recordingId = request.params.recordingId;
        logger.info(`Deleting recording ${recordingId} from station ${stationId}`);
        await recordingstore.removeRecording(recordingId);
        response.redirect("/station/" + stationId);
    },
    async addRecording(request, response) {
        const stationId = request.params.id;
        const newRecording = {
            station_id: Number(stationId),
            weather: Number(request.body.weather),
            temp: Number(request.body.temp),
            windspeed: Number(request.body.windspeed),
            pressure: Number(request.body.pressure),
            winddirection: Number(request.body.winddirection)
        };
        logger.debug("New Recording", newRecording);
        await recordingstore.addRecording(stationId, newRecording);
        response.redirect("/station/" + stationId);
    },
};

module.exports = station;