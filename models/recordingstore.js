const dataStore = require("./datastore.js");
const dataStoreClient = dataStore.getDatastore();
const logger = require("../utils/logger.js");

const recordingStore = {
    async getRecordingsforStation(stationId) {
        const query = 'select * from recordings where station_id=$1';
        const values = [stationId];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching recordings for station" ,e);
        }
    },
    async getLatestRecordingsforStation(stationId) {
        const query = 'select * from recordings join station on station.id = recordings.station_id where station_id=$1 order by created_at desc limit 1';
        const values = [stationId];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching latest recording for station", e);
        }
    }
};

module.exports = recordingStore;