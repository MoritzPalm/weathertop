const logger = require("../utils/logger.js");
const datastore = require("./datastore.js");
const dataStoreClient = datastore.getDatastore();
const stationstore = {
    async getStation(id) {
        const query = 'select * from station where id=$1';
        const values = [id];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows[0];
        } catch (e) {
            logger.error("Error fetching station id", e);
        }
    },
    async deleteStation(station_id) {
        const query = 'delete from station where id=$1';
        const values = [station_id];
        try {
            let result = await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Error deleting station", e);
        }
    },
    async addStation(station) {
        try {
            const query = 'insert into station (name, long, lat, user_id) values ($1,$2,$3,$4)';
            const values = [station.name, station.longitude, station.latitude, station.user_id];
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Error cannot add station", e);
        }
    },
    async getUserStations(email) {
        const query = 'select * from (select distinct on (s.id) * from station as s full join recordings as r on s.id = r.station_id where user_id=$1 order by s.id, created_at desc) as sr left outer join (select station_id, max(temp) as max_temp, min(temp) as min_temp, max(windspeed) as max_windspeed, min(windspeed) as min_windspeed, max(pressure) as max_pressure, min(pressure) as min_pressure from station as s2 join recordings as r2 on s2.id = r2.station_id group by station_id) as sr2 on sr2.station_id = sr.station_id'
        const values = [email];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching playlists for user: ", e);
        }
    },

};

module.exports = stationstore;