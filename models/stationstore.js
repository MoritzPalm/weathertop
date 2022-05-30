const logger = require("../utils/logger.js");
const datastore = require("./datastore.js");
const dataStoreClient = datastore.getDatastore();
const stationstore = {
    async getAllStations() {
        const query = 'select * from (select distinct on (station.id) * from station full join recordings on station.id = ' +
            'recordings.station_id order by station.id, created_at desc) as statrec order by created_at desc ';
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
        const query = 'select * from (select distinct on (station.id) * from station full join recordings on station.id = ' +
            'recordings.station_id WHERE user_id=$1 order by station.id, created_at desc) as statrec order by created_at desc';
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