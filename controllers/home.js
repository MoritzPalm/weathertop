const logger = require("../utils/logger.js");

const home = {
  index(request, response) {
    logger.info("home rendering");
    const viewData = {
      title: "Weathertop"
    };
    response.render("index", viewData);
  },
};

module.exports = home;
