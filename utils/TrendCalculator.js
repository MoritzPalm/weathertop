const logger = require('../utils/logger');

const TrendCalculator = {
    calculateTrends(recordings) {
        //Returning trends array with according bootstrap icon names
        //order of trends: temp, windspeed, pressure
        try {
            let trends = [];
            if (recordings[0].temp > recordings[1].temp) {
                trends.push("bi-arrow-up-right");
            } else if (recordings[0].temp === recordings[1].temp) {
                trends.push("bi-arrow-right");
            } else {
                trends.push("bi-arrow-down-right");
            }
            if (recordings[0].windspeed > recordings[1].windspeed) {
                trends.push("bi-arrow-up-right");
            } else if (recordings[0].windspeed === recordings[1].windspeed) {
                trends.push("bi-arrow-right");
            } else {
                trends.push("bi-arrow-down-right");
            }
            if (recordings[0].pressure > recordings[1].pressure) {
                trends.push("bi-arrow-up-right");
            } else if (recordings[0].pressure === recordings[1].pressure) {
                trends.push("bi-arrow-right");
            } else {
                trends.push("bi-arrow-down-right");
            }
            return trends;
        } catch (e) {
            logger.error("error calculating trends")
            return [0,0,0]
        }
    },
}

module.exports = TrendCalculator