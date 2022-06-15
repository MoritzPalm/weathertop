const weatherformat = {
    degree_to_direction(degree) {
        const directions = ['Nord', 'Nord Nord Ost', 'Nord Ost', 'Ost Nord Ost', 'Ost', 'Ost Süd Ost', 'Süd Ost', 'Süd Süd Ost',
            'Süd', 'Süd Süd West', 'Süd West', 'West Süd West', 'West', 'West Nord West', 'Nord West', 'Nord Nord West'];
        const i = Math.round(degree/22.5) % 16;
        return directions[i];
    },
    code_to_text(code) {
        if (code === 200) {
            return 'Gewitter';
        } else if (code === 300) {
            return 'Leichter Regen';
        } else if (code === 500) {
            return 'Regen';
        } else if (code === 600) {
            return 'Schnee';
        } else if (code === 700) {
            return 'Nebel';
        } else if (code === 800) {
            return 'Sonnig';
        } else if (code === 900) {
            return 'Bewölkt';
        }
        return 'not found';
    },
    weathercode_to_icon(code) {
        if (code === 200) {
            return "bi-cloud-lightning"
        } else if (code === 300) {
            return "bi-cloud-drizzle"
        } else if (code === 500) {
            return "bi-cloud-rain"
        } else if (code === 600) {
            return "bi-cloud-snow"
        } else if (code === 700) {
            return "bi-cloud-fog2"
        } else if (code === 800) {
            return "bi-sun"
        } else if (code === 900) {
            return "bi-clouds"
        }
        return "error"
    },
    tempcode_to_icon(code) {
        if (code < 8) {
            return "bi-thermometer-low"
        } else if (code >= 8 && code <= 16) {
            return "bi-thermometer-half"
        } else if (code > 16) {
            return "bi-thermometer-high"
        } return "error"
    }
}

module.exports = weatherformat;