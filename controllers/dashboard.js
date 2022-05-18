const logger = require("../utils/logger.js");
const stations = require("../models/stationstore.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      stations: stations,
    };
    logger.info("about to render", stations);
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
