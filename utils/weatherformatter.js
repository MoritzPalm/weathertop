const recordingstore = require('../models/recordingstore.js');

const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

const weatherformat = {
    degree_to_direction(degree) {
        const i = Math.round(degree/22.5) % 16;
        return directions[i];
    },
    code_to_text(weather) {
        if (weather === 200) {
            return 'Gewitter';
        } else if (weather === 300) {
            return 'Leichter Regen';
        } else if (weather === 500) {
            return 'Regen';
        } else if (weather === 600) {
            return 'Schnee';
        } else if (weather === 700) {
            return 'Nebel';
        } else if (weather === 800) {
            return 'Sonnig';
        } else if (weather === 900) {
            return 'Bewölkt';
        }
        return 'not found';
    }
}

module.exports = weatherformat;