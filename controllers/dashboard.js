const logger = require("../utils/logger.js");
const stationstore = require("../models/stationstore.js");
const accounts = require("./accounts.js");

const dashboard = {
  async index(request, response) {
    const loggedInUser = await accounts.getCurrentUser(request);
    logger.info("dashboard rendering");
    const stations = await stationstore.getUserStations(loggedInUser.id);
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
