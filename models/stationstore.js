const logger = require("../utils/logger.js");
const datastore = require("./datastore.js");
const dataStoreClient = datastore.getDatastore();
const stationstore = {
    async getAllStations() {
        const query = 'select * from (station join recordings on station.id = recordings.station_id)';
        try {
            let result = await dataStoreClient.query(query);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching all stations", e);
        }
    },
    async getStation(id) {
        const query = 'select * from station where id=$1';
        const values = [id];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows[0];
        } catch (e) {
            logger.error("Error fetching station", e);
        }
    },
};

module.exports = stationstore;