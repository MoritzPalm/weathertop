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
            logger.error("Error fetching songs for playlist" ,e);
        }
    },
};

module.exports = recordingStore;