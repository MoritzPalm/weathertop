const logger = require("../utils/logger.js");
const stationstore = require("../models/stationstore.js");
const accounts = require("./accounts.js");
const weatherformat = require('../utils/weatherformatter.js')
const recordingstore = require("../models/recordingstore");
const trendcalc = require("../utils/TrendCalculator");

const dashboard = {
  async index(request, response) {
    const loggedInUser = await accounts.getCurrentUser(request);
    logger.info("dashboard rendering");
    let stations = await stationstore.getUserStations(loggedInUser.id);
    let weathertext = 0
    let winddirection = 0
    let weathericon = 0
    let tempicon = 0
    let trends = 0
    for (let i = 0; i < stations.length; i++) {
      if (stations[i] !== undefined) {
        let tempStationId = stations[i].id
        let trendRecordings = await recordingstore.getTrendRecordings(tempStationId)
        weathertext = weatherformat.code_to_text(stations[i].weather)
        winddirection = weatherformat.degree_to_direction(stations[i].winddirection)
        weathericon = weatherformat.weathercode_to_icon(stations[i].weather)
        tempicon = weatherformat.tempcode_to_icon(stations[i].temp)
        if (trendRecordings !== undefined) {
          trends = trendcalc.calculateTrends(trendRecordings)
        } else {
          trends = [0,0,0]
        }
      } else {
        weathertext = '-'
        winddirection = '-'
        weathericon= '-'
        trends = [0,0,0]
      }
      stations[i].weathertext = weathertext
      stations[i].winddirection = winddirection
      stations[i].weathericon = weathericon
      stations[i].tempicon = tempicon
      stations[i].temptrend = trends[0]
      stations[i].windspeedtrend = trends[1]
      stations[i].pressuretrend = trends[2]
    }
    const viewData = {
      title: "Dashboard",
      stations: stations,
    };
    logger.info("about to render", stations);
    response.render("dashboard", viewData);
  },
  async deleteStation(request, response) {
    const station_id = request.params.station_id;
    logger.info("deleting station", station_id);
    await stationstore.deleteStation(station_id);
    response.redirect("/dashboard/");
  },
  async addStation(request, response) {
    const loggedInUser = await accounts.getCurrentUser(request);
    const newStation = {
      name: request.body.name,
      longitude: request.body.long,
      latitude: request.body.lat,
      user_id: loggedInUser.id
    };
    logger.debug("Creating a new Station", newStation);
    await stationstore.addStation(newStation);
    response.redirect("/dashboard");
  },

};

module.exports = dashboard;
