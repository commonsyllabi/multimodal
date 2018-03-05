'use strist'

exports = module.exports = {}

const fs = require('fs')
const path = require('path')


let date = () => {
	let d = new Date()

	let date = {
		'year':d.getFullYear(),
		'month':d.getMonth() >= 9 ? d.getMonth()+1 : '0'+(d.getMonth()+1),
		'day':d.getDate().toString().length == 2 ? d.getDate() : '0'+d.getDate(),
		'hour': d.getHours().toString().length == 2 ? d.getHours() : '0'+d.getHours(),
		'minutes': d.getMinutes().toString().length == 2 ? d.getMinutes() : '0'+d.getMinutes()
	}

	return date
}

module.exports.date = date

module.exports.timestamp = () => {
	let d = date()

	let timestamp = [d.year, d.month, d.day, '-', d.hour, d.minutes].join('')

	return timestamp
}

module.exports.time = () => {
	let d = new Date()

	let time = d.getHours()+':'+d.getMinutes()

	return time
}

module.exports.touchDirectory = (_path) => {
	let sep = path.sep
	let initDir = path.isAbsolute(_path) ? sep : ''
	let baseDir = '.'

	_path.split(sep).reduce((parentDir, childDir) => {
		let curDir = path.resolve(baseDir, parentDir, childDir)

		try {
			fs.mkdirSync(curDir)
			console.log(`[SUCCESS] created path:${curDir}`);
		}catch(err) {
			if(err.code != 'EEXIST')
				throw err

			console.log(`[WARNING] path ${curDir} already exists`);
		}

		return curDir
	}, initDir)
}
