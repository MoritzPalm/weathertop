const logger = require("../utils/logger.js");
const stationstore = require("../models/stationstore.js");

const dashboard = {
  async index(request, response) {
    logger.info("dashboard rendering");
    const stations = await stationstore.getAllStations();
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
  }
};

module.exports = dashboard;
