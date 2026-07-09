const { MOCKED_WEATHER } = require('./weather.mock')

function getWeather(location) {
	if (!location) {
		return MOCKED_WEATHER
	}

	return { ...MOCKED_WEATHER, location }
}

module.exports = { getWeather }
