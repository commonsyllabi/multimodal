'use strist'

exports = module.exports = {}

module.exports.timestamp = () => {
	let d = new Date()

	let timestamp = [d.getFullYear(), d.getMonth()+1, d.getDate(), '-', d.getHours(), d.getMinutes()].join('')

	return timestamp
}

module.exports.date = () => {
	let d = new Date()

	let date = {
		'year':d.getFullYear(),
		'month':d.getMonth()+1,
		'day':d.getDate(),
		'hour': d.getHours(),
		'minutes': d.getMinutes()
	}

	return date
}

module.exports.time = () => {
	let d = new Date()

	let time = d.getHours()+':'+d.getMinutes()

	return time
}
