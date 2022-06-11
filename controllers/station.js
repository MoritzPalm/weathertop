const logger = require('../utils/logger');
const stationStore = require('../models/stationstore.js');
const recordingstore = require('../models/recordingstore')
const weatherformat = require("../utils/weatherformatter");
const trendcalc = require("../utils/TrendCalculator");
const axios = require("axios");

const station = {
    async index(request, response) {
        const stationId = request.params.id
        logger.info('Station id = ' + stationId);
        const station = await stationStore.getStation(stationId)
        const recordings = await recordingstore.getRecordingsforStation(stationId)
        const currRecording = await recordingstore.getLatestRecordingsforStation(stationId)
        const TrendRecordings = await recordingstore.getTrendRecordings(stationId)
        let trends = trendcalc.calculateTrends(TrendRecordings)
        let weathertext = 0
        let winddirection = 0
        let weathericon = 0
        let tempicon = 0
        if (currRecording[0] !== undefined) {
            weathertext = weatherformat.code_to_text(currRecording[0].weather)
            winddirection = weatherformat.degree_to_direction(currRecording[0].winddirection)
            weathericon = weatherformat.weathercode_to_icon(currRecording[0].weather)
            tempicon = weatherformat.tempcode_to_icon(currRecording[0].temp)
            currRecording[0].temptrend = trends[0]
            currRecording[0].windspeedtrend = trends[1]
            currRecording[0].pressuretrend = trends[2]
        } else {
            weathertext = 'not found'
            winddirection = 'not found'
            weathericon = 'error'
            tempicon = 'error'
        }
        const viewData = {
            title: 'Station',
            station: station,
            currRecording: currRecording[0],
            recordings: recordings,
            weathertext: weathertext,
            winddirection: winddirection,
            weathericon: weathericon,
            tempicon: tempicon,
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
    async addAutoRecording(request, response) {
        const stationId = request.params.id;
        const stationData = await stationStore.getStation(stationId);
        if (stationData !== undefined) {
            const lat = stationData.lat;
            const long = stationData.long;
            const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=da9295bc840e8c70ce1e35ff8cb8d18a`;
            const result = await axios.get(requestUrl);
            if (result.status === 200) {
                const reading = result.data.current;
                const newRecording = {
                    station_id: stationId,
                    weather: Math.floor(reading.weather[0].id /100) *100,
                    temp: reading.temp,
                    windspeed: reading.wind_speed,
                    pressure: reading.pressure,
                    winddirection: reading.wind_deg
                }
                await recordingstore.addRecording(stationId, newRecording);
            }
        }
        response.redirect("/station/" + stationId);
    },
};

module.exports = station;