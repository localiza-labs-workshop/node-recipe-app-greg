const weatherService = require('./weather.service')

function getWeather(req, res) {
	const weather = weatherService.getWeather(req.query.location)
	return res.status(200).json(weather)
}

module.exports = { getWeather }
