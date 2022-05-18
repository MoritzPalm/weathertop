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
  }
};

module.exports = dashboard;
