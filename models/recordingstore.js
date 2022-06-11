const dataStore = require("./datastore.js");
const dataStoreClient = dataStore.getDatastore();
const logger = require("../utils/logger.js");

const recordingStore = {
    async getRecordingsforStation(stationId) {
        const query = 'select * from recordings where station_id=$1 order by created_at desc';
        const values = [stationId];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching recordings for station" ,e);
        }
    },
    async getLatestRecordingsforStation(stationId) {
        const query = 'select * from (select station_id, max(temp) as max_temp, min(temp) as min_temp, max(pressure) as max_pressure, min(pressure) as min_pressure, max(windspeed) as max_windspeed, min(windspeed) as min_windspeed from recordings group by station_id having station_id = $1) as r1 join (select * from recordings) as r2 on r1.station_id=r2.station_id join station on station.id = r1.station_id where r1.station_id=$1 order by created_at desc limit 1';
        const values = [stationId];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching latest recording for station", e);
        }
    },
    async removeRecording(recordingId) {
        const query = 'delete from recordings where rec_id=$1';
        const values = [recordingId];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Unable to remove recording from station", e);
        }
    },
    async addRecording(stationId, newRecording) {
        const query = 'insert into recordings (station_id, weather, temp, windspeed, pressure, winddirection) values ($1,$2,$3,$4,$5,$6)';
        const values = [newRecording.station_id, newRecording.weather, newRecording.temp, newRecording.windspeed, newRecording.pressure, newRecording.winddirection];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Error adding recording", e);
        }
    },
    async getTrendRecordings(stationId) {
        const query = 'select * from recordings where station_id = $1 order by created_at desc limit 2';
        const values = [stationId];
        try {
            let result = await dataStoreClient.query(query, values);
            if (result.rows.length < 2)
                throw "not enough recordings";
            return result.rows;
        } catch (e) {
            logger.error("Error getting recordings for trend");
        }
    },
};

module.exports = recordingStore;