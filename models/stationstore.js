const logger = require("../utils/logger.js");
const datastore = require("./datastore.js");
const datastoreClient = datastore.getDatastore();
const stationstore = {
    async getAllStations() {
        const query = 'select * from (station join recordings on station.id = recordings.station_id)';
        try {
            let result = await datastoreClient.query(query);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching all stations", e);
        }
    }
};

module.exports = stationstore;